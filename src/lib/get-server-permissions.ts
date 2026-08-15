import { auth } from "@/config/auth";
import {
	hasPermission,
	type Permission,
	type Role,
	rolePermissions,
} from "@/config/permissions";

export interface ServerPermissions {
	has: (permission: Permission) => boolean;
	organizationId?: string;
	organizationName?: string;
	permissions: Permission[];
	role: Role | undefined;
	userEmail?: string;
	userName?: string;
}

export async function getServerPermissions(): Promise<ServerPermissions> {
	const session = await auth();

	const role = session?.user?.role as Role | undefined;

	return {
		has: (permission) => hasPermission(role, permission),
		organizationId: session?.user?.organizationId ?? undefined,
		organizationName: session?.user?.organizationName ?? undefined,
		permissions: role ? rolePermissions[role] : [],
		role,
		userEmail: session?.user?.email ?? undefined,
		userName: session?.user?.name ?? undefined,
	};
}
