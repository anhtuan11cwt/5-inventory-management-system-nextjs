"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { invitedUserSchema } from "@/lib/validation";

export type InvitedUserState = {
	error?: string;
	fieldErrors?: {
		name?: string[];
		email?: string[];
		phone?: string[];
		password?: string[];
		confirmPassword?: string[];
	};
};

export async function createInvitedUser(
	_prevState: InvitedUserState,
	formData: FormData,
): Promise<InvitedUserState> {
	const organizationId = formData.get("organizationId");
	const roleId = formData.get("roleId");

	const parsed = invitedUserSchema.safeParse({
		confirmPassword: formData.get("confirmPassword"),
		email: formData.get("email"),
		name: formData.get("name"),
		password: formData.get("password"),
		phone: formData.get("phone"),
	});

	if (typeof organizationId !== "string" || typeof roleId !== "string") {
		return { error: "Liên kết mời không hợp lệ" };
	}

	if (!parsed.success) {
		const fieldErrors = parsed.error.flatten().fieldErrors;
		return { fieldErrors };
	}

	const { name, email, password } = parsed.data;

	const existingUser = await db.user.findUnique({ where: { email } });
	if (existingUser) {
		return {
			fieldErrors: { email: ["Email này đã được sử dụng"] },
		};
	}

	const invite = await db.invite.findUnique({
		include: { organization: true, role: true },
		where: { email },
	});

	if (
		!invite ||
		invite.organizationId !== organizationId ||
		invite.roleId !== roleId
	) {
		return { error: "Lời mời không hợp lệ hoặc đã được sử dụng" };
	}

	if (invite.status) {
		return { error: "Lời mời này đã được chấp nhận" };
	}

	const passwordHash = await bcrypt.hash(password, 10);

	await db.$transaction([
		db.user.create({
			data: {
				email,
				isVerified: true,
				name,
				organizationId,
				organizationName: invite.organization.name,
				password: passwordHash,
				roleId,
			},
		}),
		db.invite.update({
			data: { status: true },
			where: { id: invite.id },
		}),
	]);

	redirect("/login?invited=1");
}
