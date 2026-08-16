import { MailCheck } from "lucide-react";
import type { Metadata } from "next";
import { VerifyOTPForm } from "@/components/auth/verify-otp-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Xác thực email",
};

export default async function VerifyPage(props: PageProps<"/verify/[userId]">) {
	const { userId } = await props.params;
	const searchParams = await props.searchParams;
	const email =
		typeof searchParams.email === "string" ? searchParams.email : undefined;
	const registered = searchParams.registered === "1";

	return (
		<div className="mx-auto w-full max-w-md">
			<Card className="border-border bg-card shadow-sm">
				<CardHeader className="items-center text-center">
					<div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
						<MailCheck className="size-6" />
					</div>
					<CardTitle className="font-heading text-2xl">
						Xác thực email của bạn
					</CardTitle>
					<CardDescription>
						Xác nhận địa chỉ email để kích hoạt tài khoản của bạn.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<VerifyOTPForm
						email={email}
						showWelcome={registered}
						userId={userId}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
