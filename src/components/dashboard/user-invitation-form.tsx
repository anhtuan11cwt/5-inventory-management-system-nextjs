"use client";

import { Loader2, UserPlus } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { type InviteState, sendInvite } from "@/actions/users/invites";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { inviteSchema } from "@/lib/validation";

const SUBMIT_DELAY_MS = 2000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface RoleOption {
	id: string;
	name: string;
}

type InviteErrors = {
	email?: string[];
	roleId?: string[];
};

export function UserInvitationForm({
	organizationId,
	organizationName,
	roles,
}: {
	organizationId: string;
	organizationName: string;
	roles: RoleOption[];
}) {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [roleId, setRoleId] = useState(roles[0]?.id ?? "");
	const [fieldErrors, setFieldErrors] = useState<InviteErrors>();
	const [delaying, setDelaying] = useState(false);
	const [state, formAction, isPending] = useActionState<InviteState, FormData>(
		sendInvite,
		{},
	);

	const loading = delaying || isPending;

	useEffect(() => {
		if (state.success) {
			toast.success("Đã gửi lời mời thành công!");
			setTimeout(() => {
				setEmail("");
				setFieldErrors(undefined);
				setOpen(false);
			}, 0);
		}
	}, [state.success]);

	useEffect(() => {
		if (state.error) {
			toast.error(state.error);
		}
	}, [state.error]);

	async function handleSubmit(formData: FormData) {
		const parsed = inviteSchema.safeParse({ email, roleId });

		if (!parsed.success) {
			setFieldErrors(parsed.error.flatten().fieldErrors as InviteErrors);
			return;
		}

		setFieldErrors(undefined);
		formData.set("organizationId", organizationId);
		formData.set("organizationName", organizationName);
		formData.set("roleId", roleId);
		setDelaying(true);
		startTransition(() => {
			formAction(formData);
		});
		await delay(SUBMIT_DELAY_MS);
		setDelaying(false);
	}

	return (
		<Dialog
			disablePointerDismissal
			onOpenChange={(next) => {
				setOpen(next);
				if (next) {
					setFieldErrors(undefined);
					setEmail("");
				}
			}}
			open={open}
		>
			<DialogTrigger
				render={
					<Button className="ml-auto">
						<UserPlus />
						Mời người dùng
					</Button>
				}
			/>
			<DialogContent
				className="sm:max-w-md"
				data-form-loading={loading ? "true" : "false"}
			>
				<DialogHeader>
					<DialogTitle>Mời người dùng tham gia</DialogTitle>
					<DialogDescription>
						Nhập email và chọn vai trò. Chúng tôi sẽ gửi liên kết mời đến email
						này.
					</DialogDescription>
				</DialogHeader>
				<form action={handleSubmit} className="space-y-4" noValidate>
					<div className="space-y-2">
						<Label htmlFor="invite-email">Email</Label>
						<Input
							aria-invalid={Boolean(fieldErrors?.email)}
							autoComplete="email"
							disabled={loading}
							id="invite-email"
							name="email"
							onChange={(event) => setEmail(event.target.value)}
							placeholder="thanhvien@congty.com"
							required
							type="email"
							value={email}
						/>
						{fieldErrors?.email && (
							<p className="text-destructive text-xs">{fieldErrors.email[0]}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="invite-role">Vai trò</Label>
						<Select
							onValueChange={(value) => {
								setRoleId(value ?? "");
								setFieldErrors((current) => ({
									...current,
									roleId: undefined,
								}));
							}}
							value={roleId}
						>
							<SelectTrigger
								aria-invalid={Boolean(fieldErrors?.roleId)}
								className="w-full"
								disabled={loading}
								id="invite-role"
							>
								<SelectValue>
									{(value) =>
										roles.find((role) => role.id === value)?.name ??
										"Chọn vai trò"
									}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{roles.map((role) => (
									<SelectItem key={role.id} value={role.id}>
										{role.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{fieldErrors?.roleId && (
							<p className="text-destructive text-xs">
								{fieldErrors.roleId[0]}
							</p>
						)}
					</div>
					<DialogFooter>
						<Button disabled={loading} type="submit">
							{loading ? (
								<>
									<Loader2 className="animate-spin" />
									Đang gửi...
								</>
							) : (
								<>
									<UserPlus />
									Gửi lời mời
								</>
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
