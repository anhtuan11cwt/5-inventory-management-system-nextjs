import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import { VerifyEmail } from "@/emails/VerifyEmail";

const transporter = nodemailer.createTransport({
	auth: {
		pass: process.env.GMAIL_APP_PASSWORD,
		user: process.env.GMAIL_USER,
	},
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
});

function isConfigured(): boolean {
	return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendVerificationEmail({
	to,
	userName,
	organizationName,
	otp,
}: {
	to: string;
	userName: string;
	organizationName: string;
	otp: string;
}): Promise<void> {
	if (!isConfigured()) {
		console.warn(
			"[email] GMAIL_USER / GMAIL_APP_PASSWORD chưa được cấu hình. Bỏ qua gửi email.",
			{ otp, to },
		);
		return;
	}

	const html = await render(
		<VerifyEmail
			organizationName={organizationName}
			otp={otp}
			userName={userName}
		/>,
	);

	await transporter.sendMail({
		from: `"Inventory Pro" <${process.env.GMAIL_USER}>`,
		html,
		subject: "Xác thực tài khoản của bạn",
		to,
	});
}
