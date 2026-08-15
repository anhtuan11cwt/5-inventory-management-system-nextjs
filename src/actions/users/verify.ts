"use server";

import { redirect } from "next/navigation";

import { db } from "@/lib/db";

export type VerifyState = {
	error?: string;
	success?: boolean;
};

export async function verifyOTP(
	_prevState: VerifyState,
	formData: FormData,
): Promise<VerifyState> {
	const userId = formData.get("userId");
	const otp = formData.get("otp");

	if (
		typeof userId !== "string" ||
		typeof otp !== "string" ||
		otp.length !== 6
	) {
		return { error: "Vui lòng nhập mã xác thực gồm 6 chữ số" };
	}

	const user = await db.user.findUnique({
		select: { email: true, id: true, isVerified: true, token: true },
		where: { id: userId },
	});

	if (!user) {
		return { error: "Không tìm thấy tài khoản. Vui lòng đăng ký lại." };
	}

	if (user.isVerified) {
		redirect("/login?verified=1");
	}

	if (!user.token || user.token !== otp) {
		return { error: "Mã xác thực không đúng. Vui lòng thử lại." };
	}

	await db.user.update({
		data: { isVerified: true, token: null },
		where: { id: user.id },
	});

	redirect("/login?verified=1");
}
