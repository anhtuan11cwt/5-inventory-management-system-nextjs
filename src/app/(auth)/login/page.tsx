import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Đăng nhập",
};

export default async function LoginPage(props: PageProps<"/login">) {
	const searchParams = await props.searchParams;
	const verified = searchParams.verified === "1";
	const invited = searchParams.invited === "1";

	return (
		<div className="mx-auto w-full max-w-md">
			<Card className="border-border bg-card shadow-sm">
				<CardHeader>
					<CardTitle className="font-heading text-2xl">
						Chào mừng trở lại
					</CardTitle>
				</CardHeader>
				<CardContent>
					<LoginForm invited={invited} verified={verified} />
				</CardContent>
			</Card>
		</div>
	);
}
