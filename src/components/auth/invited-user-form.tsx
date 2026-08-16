"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import {
	createInvitedUser,
	type InvitedUserState,
} from "@/actions/users/create-invited";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { invitedUserSchema } from "@/lib/validation";

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

export function InvitedUserForm({
	email,
	organizationId,
	roleId,
}: {
	email: string;
	organizationId: string;
	roleId: string;
}) {
	const [state, formAction, isPending] = useActionState<
		InvitedUserState,
		FormData
	>(createInvitedUser, {});
	const [clientErrors, setClientErrors] =
		useState<InvitedUserState["fieldErrors"]>();
	const [delaying, setDelaying] = useState(false);
	const [phone, setPhone] = useState("");
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
		const parsed = invitedUserSchema.safeParse({
			confirmPassword: formData.get("confirmPassword"),
			email: formData.get("email"),
			name: formData.get("name"),
			password: formData.get("password"),
			phone: formData.get("phone"),
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
			<input name="organizationId" type="hidden" value={organizationId} />
			<input name="roleId" type="hidden" value={roleId} />
			<input name="email" type="hidden" value={email} />

			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input disabled id="email" readOnly value={email} />
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
				<Label htmlFor="phone">Số điện thoại</Label>
				<Input
					aria-invalid={Boolean(fieldErrors?.phone)}
					autoComplete="tel"
					disabled={loading}
					id="phone"
					inputMode="numeric"
					maxLength={10}
					name="phone"
					onChange={(event) =>
						setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
					}
					placeholder="0912345678"
					required
					type="tel"
					value={phone}
				/>
				{fieldErrors?.phone && (
					<p className="text-destructive text-xs">{fieldErrors.phone[0]}</p>
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
