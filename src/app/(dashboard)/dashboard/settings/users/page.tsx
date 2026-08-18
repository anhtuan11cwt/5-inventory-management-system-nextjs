import type { Metadata } from "next";

import { getOrganizationInvites } from "@/actions/users/invites";
import { getOrganizationUsers } from "@/actions/users/list";
import {
	type InviteRow,
	InviteTable,
} from "@/components/dashboard/invite-table";
import { UserInvitationForm } from "@/components/dashboard/user-invitation-form";
import { type UserRow, UserTable } from "@/components/dashboard/user-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/config/auth";
import { getOrganizationRoles } from "@/lib/roles";

export const metadata: Metadata = { title: "Người dùng" };

export default async function UsersPage() {
	const session = await auth();
	const organizationId = session?.user?.organizationId;
	const organizationName = session?.user?.organizationName;

	if (!organizationId) {
		return null;
	}

	const [users, invites, roles] = await Promise.all([
		getOrganizationUsers(organizationId),
		getOrganizationInvites(organizationId),
		getOrganizationRoles(organizationId),
	]);

	const userRows: UserRow[] = users.map((user) => ({
		email: user.email,
		id: user.id,
		name: user.name,
		roleName: user.role.name,
	}));

	const inviteRows: InviteRow[] = invites.map((invite) => ({
		createdAt: invite.createdAt,
		email: invite.email,
		id: invite.id,
		roleName: invite.role.name,
		status: invite.status,
	}));

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
						Người dùng
					</h1>
					<p className="mt-1 text-muted-foreground">
						Mời thành viên và quản lý quyền truy cập tại {organizationName}.
					</p>
				</div>
				<UserInvitationForm
					organizationId={organizationId}
					organizationName={organizationName ?? ""}
					roles={roles.map((role) => ({ id: role.id, name: role.name }))}
				/>
			</div>

			<Tabs defaultValue="users">
				<TabsList>
					<TabsTrigger value="users">Người dùng</TabsTrigger>
					<TabsTrigger value="invites">Lời mời</TabsTrigger>
				</TabsList>
				<TabsContent className="mt-4" value="users">
					<div className="rounded-xl border border-border bg-card">
						<UserTable users={userRows} />
					</div>
				</TabsContent>
				<TabsContent className="mt-4" value="invites">
					<div className="rounded-xl border border-border bg-card">
						<InviteTable invites={inviteRows} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
