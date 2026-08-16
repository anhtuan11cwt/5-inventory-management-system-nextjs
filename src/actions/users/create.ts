"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { generateOTP } from "@/lib/otp";
import { ensureDefaultRoles } from "@/lib/roles";
import { generateUniqueSlug } from "@/lib/slug";
import { registerSchema } from "@/lib/validation";

const VIETNAM_DEFAULTS = {
	country: "Vietnam",
	currency: "VND",
	timeZone: "Asia/Ho_Chi_Minh",
} as const;

export type RegisterState = {
	error?: string;
	fieldErrors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
		organizationName?: string[];
	};
};

export async function createUser(
	_prevState: RegisterState,
	formData: FormData,
): Promise<RegisterState> {
	const parsed = registerSchema.safeParse({
		confirmPassword: formData.get("confirmPassword"),
		email: formData.get("email"),
		name: formData.get("name"),
		organizationName: formData.get("organizationName"),
		password: formData.get("password"),
	});

	if (!parsed.success) {
		const fieldErrors = parsed.error.flatten().fieldErrors;
		return { fieldErrors };
	}

	const { name, email, password, organizationName } = parsed.data;

	const existingUser = await db.user.findUnique({
		where: { email },
	});
	if (existingUser) {
		return {
			fieldErrors: {
				email: ["Đã có tài khoản sử dụng email này"],
			},
		};
	}

	const slug = await generateUniqueSlug(organizationName);

	let newUserId: string;
	let newUserEmail: string;

	try {
		const otp = generateOTP();
		const passwordHash = await bcrypt.hash(password, 10);

		const organization = await db.organization.create({
			data: {
				country: VIETNAM_DEFAULTS.country,
				currency: VIETNAM_DEFAULTS.currency,
				name: organizationName,
				slug,
				timeZone: VIETNAM_DEFAULTS.timeZone,
			},
		});

		const { adminRole } = await ensureDefaultRoles(organization.id);

		const user = await db.user.create({
			data: {
				email,
				isVerified: false,
				name,
				organizationId: organization.id,
				organizationName: organization.name,
				password: passwordHash,
				roleId: adminRole.id,
				token: otp,
			},
		});

		await sendVerificationEmail({
			organizationName: user.organizationName,
			otp,
			to: user.email,
			userName: user.name,
		});

		newUserId = user.id;
		newUserEmail = user.email;
	} catch (error) {
		console.error("[register] Không thể tạo tài khoản:", error);
		return {
			error: "Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.",
		};
	}

	redirect(
		`/verify/${newUserId}?email=${encodeURIComponent(newUserEmail)}&registered=1`,
	);
}
