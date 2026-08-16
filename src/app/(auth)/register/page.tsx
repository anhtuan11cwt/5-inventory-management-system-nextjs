import type { Metadata } from "next";

import { Carousel } from "@/components/auth/carousel";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Tạo tài khoản",
};

export default function RegisterPage() {
	return (
		<div className="grid w-full items-center gap-6 lg:grid-cols-2 lg:gap-10">
			<Carousel />
			<div className="mx-auto w-full max-w-md">
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
			</div>
		</div>
	);
}
