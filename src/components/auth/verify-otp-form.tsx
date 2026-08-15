"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import {
	startTransition,
	useActionState,
	useEffect,
	useRef,
	useState,
} from "react";
import { toast } from "sonner";
import { type VerifyState, verifyOTP } from "@/actions/users/verify";
import { Button } from "@/components/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";

const SUBMIT_DELAY_MS = 2000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function VerifyOTPForm({
	userId,
	email,
	showWelcome = false,
}: {
	userId: string;
	email?: string;
	showWelcome?: boolean;
}) {
	const [state, formAction, isPending] = useActionState<VerifyState, FormData>(
		verifyOTP,
		{},
	);
	const [delaying, setDelaying] = useState(false);
	const welcomeShown = useRef(false);

	const loading = delaying || isPending;

	useEffect(() => {
		if (showWelcome && !welcomeShown.current) {
			welcomeShown.current = true;
			toast.success(
				"Tài khoản đã được tạo thành công! Vui lòng kiểm tra email để lấy mã xác thực 6 chữ số.",
			);
		}
	}, [showWelcome]);

	useEffect(() => {
		if (state.error) {
			toast.error(state.error);
		}
	}, [state.error]);

	async function handleAction(formData: FormData) {
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
			className="flex flex-col items-center gap-6"
			data-form-loading={loading ? "true" : "false"}
			noValidate
		>
			<input name="userId" type="hidden" value={userId} />
			{email ? (
				<p className="text-center text-muted-foreground text-sm">
					Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến{" "}
					<span className="font-medium text-foreground">{email}</span>
				</p>
			) : (
				<p className="text-center text-muted-foreground text-sm">
					Nhập mã xác thực gồm 6 chữ số được gửi đến email của bạn.
				</p>
			)}

			<InputOTP disabled={loading} maxLength={6} name="otp" required>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>

			<Button
				className="w-full max-w-sm"
				disabled={loading}
				size="lg"
				type="submit"
			>
				{loading ? (
					<>
						<Loader2 className="animate-spin" />
						Đang xác thực...
					</>
				) : (
					<>
						Xác thực tài khoản
						<ArrowRight />
					</>
				)}
			</Button>
		</form>
	);
}
