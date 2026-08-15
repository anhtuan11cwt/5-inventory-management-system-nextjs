export type Role = "ADMIN" | "USER";

export type Permission =
	| "dashboard.read"
	| "products.read"
	| "products.write"
	| "inventory.read"
	| "inventory.write"
	| "sales.read"
	| "purchases.read"
	| "reports.read"
	| "users.read"
	| "users.write"
	| "settings.read";

export const rolePermissions: Record<Role, Permission[]> = {
	ADMIN: [
		"dashboard.read",
		"products.read",
		"products.write",
		"inventory.read",
		"inventory.write",
		"sales.read",
		"purchases.read",
		"reports.read",
		"users.read",
		"users.write",
		"settings.read",
	],
	USER: [
		"dashboard.read",
		"products.read",
		"inventory.read",
		"sales.read",
		"purchases.read",
	],
};

export const routePermissions: Record<string, Permission> = {
	"/dashboard": "dashboard.read",
	"/dashboard/inventory": "inventory.read",
	"/dashboard/products": "products.read",
	"/dashboard/products/new": "products.write",
	"/dashboard/purchases": "purchases.read",
	"/dashboard/reports": "reports.read",
	"/dashboard/sales": "sales.read",
	"/dashboard/settings": "settings.read",
	"/dashboard/users": "users.read",
};

export function hasPermission(
	role: Role | undefined,
	permission: Permission,
): boolean {
	if (!role) return false;
	return rolePermissions[role]?.includes(permission) ?? false;
}

export function canAccessRoute(
	role: Role | undefined,
	pathname: string,
): boolean {
	const permission = Object.entries(routePermissions).find(
		([route]) => pathname === route || pathname.startsWith(`${route}/`),
	)?.[1];

	if (!permission) return true;
	return hasPermission(role, permission);
}
