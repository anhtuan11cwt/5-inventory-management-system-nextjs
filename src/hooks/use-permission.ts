"use client";

import { useSession } from "next-auth/react";

import { hasPermission, type Permission } from "@/config/permissions";

export function usePermission() {
	const { data: session } = useSession();
	const role = session?.user?.role;

	return {
		has: (permission: Permission) => hasPermission(role, permission),
		organizationId: session?.user?.organizationId,
		organizationName: session?.user?.organizationName,
		role,
	};
}
