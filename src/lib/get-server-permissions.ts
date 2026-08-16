import { auth } from "@/config/auth";
import { hasPermission, type Permission } from "@/config/permissions";

export interface ServerPermissions {
	has: (permission: Permission) => boolean;
	organizationId?: string;
	organizationName?: string;
	permissions: Permission[];
	roleId?: string;
	roleName?: string;
	userEmail?: string;
	userName?: string;
}

export async function getServerPermissions(): Promise<ServerPermissions> {
	const session = await auth();

	const permissions = session?.user?.permissions ?? [];

	return {
		has: (permission) => hasPermission(permissions, permission),
		organizationId: session?.user?.organizationId ?? undefined,
		organizationName: session?.user?.organizationName ?? undefined,
		permissions,
		roleId: session?.user?.roleId ?? undefined,
		roleName: session?.user?.roleName ?? undefined,
		userEmail: session?.user?.email ?? undefined,
		userName: session?.user?.name ?? undefined,
	};
}
