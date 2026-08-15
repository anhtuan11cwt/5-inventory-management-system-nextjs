"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validation";

const SUBMIT_DELAY_MS = 2000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type LoginErrors = {
	email?: string[];
	password?: string[];
};

export function LoginForm({ verified = false }: { verified?: boolean }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<LoginErrors>();
	const verifiedShown = useRef(false);

	useEffect(() => {
		if (verified && !verifiedShown.current) {
			verifiedShown.current = true;
			toast.success(
				"Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.",
			);
		}
	}, [verified]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const email = String(formData.get("email") ?? "");
		const password = String(formData.get("password") ?? "");

		const parsed = loginSchema.safeParse({ email, password });
		if (!parsed.success) {
			setErrors(parsed.error.flatten().fieldErrors as LoginErrors);
			setLoading(false);
			return;
		}
		setErrors(undefined);

		try {
			await delay(SUBMIT_DELAY_MS);

			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				toast.error(
					"Vui lòng kiểm tra thông tin đăng nhập hoặc đảm bảo bạn đã xác thực email",
				);
				return;
			}

			toast.success("Đăng nhập thành công!");
			router.push("/dashboard");
			router.refresh();
		} catch {
			toast.error(
				"Vui lòng kiểm tra thông tin đăng nhập hoặc đảm bảo bạn đã xác thực email",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			className="space-y-5"
			data-form-loading={loading ? "true" : "false"}
			noValidate
			onSubmit={handleSubmit}
		>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					aria-invalid={Boolean(errors?.email)}
					autoComplete="email"
					disabled={loading}
					id="email"
					name="email"
					placeholder="ban@congty.com"
					required
					type="email"
				/>
				{errors?.email && (
					<p className="text-destructive text-xs">{errors.email[0]}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Mật khẩu</Label>
				<PasswordInput
					aria-invalid={Boolean(errors?.password)}
					autoComplete="current-password"
					disabled={loading}
					id="password"
					name="password"
					placeholder="Mật khẩu của bạn"
					required
				/>
				{errors?.password && (
					<p className="text-destructive text-xs">{errors.password[0]}</p>
				)}
			</div>

			<Button className="w-full" disabled={loading} size="lg" type="submit">
				{loading ? (
					<>
						<Loader2 className="animate-spin" />
						Đang đăng nhập...
					</>
				) : (
					<>
						Đăng nhập
						<ArrowRight />
					</>
				)}
			</Button>

			<p className="text-center text-muted-foreground text-sm">
				Chưa có tài khoản?{" "}
				<Link
					className="font-medium text-primary underline-offset-4 hover:underline"
					href="/register"
				>
					Bắt đầu dùng thử miễn phí
				</Link>
			</p>
		</form>
	);
}
