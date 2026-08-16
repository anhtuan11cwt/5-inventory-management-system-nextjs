import {
	adminPermissions,
	defaultUserPermissions,
	type Permission,
} from "@/config/permissions";
import { db } from "@/lib/db";

export const DEFAULT_ADMIN_ROLE = "Admin";
export const DEFAULT_USER_ROLE = "User";

export async function findOrCreateDefaultRole(
	organizationId: string,
	name: string,
	permissions: Permission[],
) {
	const existing = await db.role.findFirst({
		where: { name, organizationId },
	});

	if (existing) return existing;

	return db.role.create({
		data: {
			name,
			organizationId,
			permissions,
		},
	});
}

export async function ensureDefaultRoles(organizationId: string) {
	const adminRole = await findOrCreateDefaultRole(
		organizationId,
		DEFAULT_ADMIN_ROLE,
		adminPermissions,
	);
	const userRole = await findOrCreateDefaultRole(
		organizationId,
		DEFAULT_USER_ROLE,
		defaultUserPermissions,
	);
	return { adminRole, userRole };
}

export async function getOrganizationRoles(organizationId: string) {
	return db.role.findMany({
		orderBy: { createdAt: "asc" },
		where: { organizationId },
	});
}
