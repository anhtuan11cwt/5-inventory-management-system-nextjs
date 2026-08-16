"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export async function getOrganizationUsers(organizationId: string) {
	return db.user.findMany({
		include: { role: { select: { name: true, permissions: true } } },
		orderBy: { createdAt: "desc" },
		where: { organizationId },
	});
}

export async function deleteUser(userId: string): Promise<{ error?: string }> {
	const user = await db.user.findUnique({
		select: { email: true },
		where: { id: userId },
	});

	if (!user) {
		return { error: "Không tìm thấy người dùng" };
	}

	await db.$transaction([
		db.invite.deleteMany({ where: { email: user.email } }),
		db.user.delete({ where: { id: userId } }),
	]);

	revalidatePath("/dashboard/users");

	return {};
}
