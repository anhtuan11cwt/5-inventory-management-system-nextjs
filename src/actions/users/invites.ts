"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/config/auth";
import { hasPermission } from "@/config/permissions";
import { db } from "@/lib/db";
import { sendInviteEmail } from "@/lib/email";
import { inviteSchema } from "@/lib/validation";

export type InviteState = {
	error?: string;
	success?: boolean;
};

export async function sendInvite(
	_prevState: InviteState,
	formData: FormData,
): Promise<InviteState> {
	const organizationId = formData.get("organizationId");
	const organizationName = formData.get("organizationName");

	const session = await auth();
	const caller = session?.user;

	if (!caller) {
		return { error: "Vui lòng đăng nhập để mời người dùng" };
	}

	if (!hasPermission(caller.permissions, "users.write")) {
		return { error: "Bạn không có quyền mời người dùng" };
	}

	if (
		typeof organizationId !== "string" ||
		typeof organizationName !== "string"
	) {
		return { error: "Thiếu thông tin tổ chức" };
	}

	if (caller.organizationId !== organizationId) {
		return { error: "Bạn chỉ có thể mời trong tổ chức của mình" };
	}

	const parsed = inviteSchema.safeParse({
		email: formData.get("email"),
		roleId: formData.get("roleId"),
	});

	if (!parsed.success) {
		const message = parsed.error.flatten().fieldErrors.email?.[0];
		return { error: message ?? "Vui lòng kiểm tra lại thông tin" };
	}

	const { email, roleId } = parsed.data;

	const existingUser = await db.user.findUnique({ where: { email } });
	if (existingUser) {
		return { error: "Email này đã được sử dụng trong hệ thống" };
	}

	const existingInvite = await db.invite.findUnique({ where: { email } });
	if (existingInvite) {
		return { error: "Email này đã được mời trước đó" };
	}

	const role = await db.role.findFirst({
		where: { id: roleId, organizationId },
	});
	if (!role) {
		return { error: "Vai trò không hợp lệ" };
	}

	await db.invite.create({
		data: {
			email,
			organizationId,
			roleId,
			status: false,
		},
	});

	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL ?? process.env.AUTH_URL ?? "";
	const linkUrl = `${baseUrl}/user-invite/${organizationId}/${roleId}?email=${encodeURIComponent(email)}&orgName=${encodeURIComponent(organizationName)}`;

	await sendInviteEmail({
		linkUrl,
		organizationName,
		roleName: role.name,
		to: email,
	});

	revalidatePath("/dashboard/users");

	return { success: true };
}

export async function getOrganizationInvites(organizationId: string) {
	return db.invite.findMany({
		include: { role: { select: { name: true } } },
		orderBy: { createdAt: "desc" },
		where: { organizationId },
	});
}
