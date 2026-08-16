import { MailCheck } from "lucide-react";
import type { Metadata } from "next";

import { InvitedUserForm } from "@/components/auth/invited-user-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";

export const metadata: Metadata = {
	title: "Thiết lập tài khoản",
};

export default async function UserInvitePage(
	props: PageProps<"/user-invite/[organizationId]/[roleId]">,
) {
	const { organizationId, roleId } = await props.params;
	const searchParams = await props.searchParams;
	const email =
		typeof searchParams.email === "string" ? searchParams.email : "";

	const invite = email
		? await db.invite.findUnique({
				include: { organization: true, role: true },
				where: { email },
			})
		: null;

	const valid =
		invite &&
		invite.organizationId === organizationId &&
		invite.roleId === roleId &&
		!invite.status;

	if (!valid) {
		return (
			<div className="mx-auto w-full max-w-md text-center">
				<Card className="border-border bg-card shadow-sm">
					<CardContent className="py-10">
						<p className="font-medium">Lời mời không hợp lệ hoặc đã hết hạn</p>
						<p className="mt-2 text-muted-foreground text-sm">
							Vui lòng liên hệ quản trị viên tổ chức để nhận lời mời mới.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-md">
			<Card className="border-border bg-card shadow-sm">
				<CardHeader className="items-center text-center">
					<div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
						<MailCheck className="size-6" />
					</div>
					<CardTitle className="font-heading text-2xl">
						Thiết lập tài khoản của bạn
					</CardTitle>
					<CardDescription>
						Bạn được mời tham gia{" "}
						<span className="font-medium text-foreground">
							{invite.organization.name}
						</span>{" "}
						với vai trò{" "}
						<span className="font-medium text-foreground">
							{invite.role.name}
						</span>
						.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<InvitedUserForm
						email={email}
						organizationId={organizationId}
						roleId={roleId}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
