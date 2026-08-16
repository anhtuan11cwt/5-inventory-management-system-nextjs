"use client";

import { useSession } from "next-auth/react";

import { hasPermission, type Permission } from "@/config/permissions";

export function usePermission() {
	const { data: session } = useSession();
	const permissions = session?.user?.permissions ?? [];

	return {
		has: (permission: Permission) => hasPermission(permissions, permission),
		organizationId: session?.user?.organizationId,
		organizationName: session?.user?.organizationName,
		permissions,
		roleName: session?.user?.roleName,
	};
}
