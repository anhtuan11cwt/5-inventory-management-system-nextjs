"use client";

import { ArrowRight, Building2, Loader2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createUser, type RegisterState } from "@/actions/users/create";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/lib/validation";

const SUBMIT_DELAY_MS = 2000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function SubmitButton({ loading }: { loading: boolean }) {
	return (
		<Button className="w-full" disabled={loading} size="lg" type="submit">
			{loading ? (
				<>
					<Loader2 className="animate-spin" />
					Đang tạo tài khoản...
				</>
			) : (
				<>
					Tạo tài khoản
					<ArrowRight />
				</>
			)}
		</Button>
	);
}

export function RegisterForm() {
	const [state, formAction, isPending] = useActionState<
		RegisterState,
		FormData
	>(createUser, {});
	const [clientErrors, setClientErrors] =
		useState<RegisterState["fieldErrors"]>();
	const [delaying, setDelaying] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const loading = delaying || isPending;

	function toggleShowPassword() {
		setShowPassword((current) => !current);
	}

	useEffect(() => {
		if (state.error) {
			toast.error(state.error);
		}
	}, [state.error]);

	const fieldErrors = clientErrors ?? state.fieldErrors;

	async function handleAction(formData: FormData) {
		const parsed = registerSchema.safeParse({
			confirmPassword: formData.get("confirmPassword"),
			email: formData.get("email"),
			name: formData.get("name"),
			organizationName: formData.get("organizationName"),
			password: formData.get("password"),
		});

		if (!parsed.success) {
			setClientErrors(parsed.error.flatten().fieldErrors);
			return;
		}

		setClientErrors(undefined);
		setDelaying(true);
		startTransition(() => {
			formAction(formData);
		});
		await delay(SUBMIT_DELAY_MS);
		setDelaying(false);
	}

	return (
		<form
			action={handleAction}
			className="space-y-5"
			data-form-loading={loading ? "true" : "false"}
			noValidate
		>
			<div className="space-y-2">
				<Label htmlFor="organizationName">Tên công ty</Label>
				<div className="relative">
					<Building2 className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						aria-invalid={Boolean(fieldErrors?.organizationName)}
						autoComplete="organization"
						className="pl-8"
						disabled={loading}
						id="organizationName"
						name="organizationName"
						placeholder="Công ty TNHH ABC"
						required
					/>
				</div>
				{fieldErrors?.organizationName && (
					<p className="text-destructive text-xs">
						{fieldErrors.organizationName[0]}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="name">Họ và tên</Label>
				<Input
					aria-invalid={Boolean(fieldErrors?.name)}
					autoComplete="name"
					disabled={loading}
					id="name"
					name="name"
					placeholder="Nguyễn Văn An"
					required
				/>
				{fieldErrors?.name && (
					<p className="text-destructive text-xs">{fieldErrors.name[0]}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					aria-invalid={Boolean(fieldErrors?.email)}
					autoComplete="email"
					disabled={loading}
					id="email"
					name="email"
					placeholder="ban@congty.com"
					required
					type="email"
				/>
				{fieldErrors?.email && (
					<p className="text-destructive text-xs">{fieldErrors.email[0]}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Mật khẩu</Label>
				<PasswordInput
					aria-invalid={Boolean(fieldErrors?.password)}
					autoComplete="new-password"
					disabled={loading}
					id="password"
					name="password"
					onToggle={toggleShowPassword}
					placeholder="Tối thiểu 8 ký tự, có hoa/thường/số/ký tự đặc biệt"
					required
					show={showPassword}
				/>
				{fieldErrors?.password && (
					<p className="text-destructive text-xs">{fieldErrors.password[0]}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
				<PasswordInput
					aria-invalid={Boolean(fieldErrors?.confirmPassword)}
					autoComplete="new-password"
					disabled={loading}
					id="confirmPassword"
					name="confirmPassword"
					onToggle={toggleShowPassword}
					placeholder="Nhập lại mật khẩu"
					required
					show={showPassword}
				/>
				{fieldErrors?.confirmPassword && (
					<p className="text-destructive text-xs">
						{fieldErrors.confirmPassword[0]}
					</p>
				)}
			</div>

			<SubmitButton loading={loading} />

			<p className="text-center text-muted-foreground text-sm">
				Đã có tài khoản?{" "}
				<Link
					className="font-medium text-primary underline-offset-4 hover:underline"
					href="/login"
				>
					Đăng nhập
				</Link>
			</p>
		</form>
	);
}
