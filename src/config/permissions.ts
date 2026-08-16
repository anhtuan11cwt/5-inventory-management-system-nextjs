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

export const adminPermissions: Permission[] = [
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
];

export const defaultUserPermissions: Permission[] = [
	"dashboard.read",
	"products.read",
	"inventory.read",
	"sales.read",
	"purchases.read",
];

export const routePermissions: Record<string, Permission> = {
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
	permissions: Permission[] | undefined,
	permission: Permission,
): boolean {
	if (!permissions) return false;
	return permissions.includes(permission);
}

export function canAccessRoute(
	permissions: Permission[] | undefined,
	pathname: string,
): boolean {
	const matches = Object.entries(routePermissions).filter(
		([route]) => pathname === route || pathname.startsWith(`${route}/`),
	);

	if (matches.length === 0) return true;

	matches.sort((a, b) => b[0].length - a[0].length);
	const permission = matches[0][1];

	return hasPermission(permissions, permission);
}
