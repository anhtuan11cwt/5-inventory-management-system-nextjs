import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Tạo tài khoản",
};

export default function RegisterPage() {
	return (
		<Card className="border-border bg-card shadow-sm">
			<CardHeader>
				<CardTitle className="font-heading text-2xl">
					Tạo tài khoản Inventory Pro để bắt đầu
				</CardTitle>
			</CardHeader>
			<CardContent>
				<RegisterForm />
			</CardContent>
		</Card>
	);
}
