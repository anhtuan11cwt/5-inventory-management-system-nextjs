export type Permission =
	| "dashboard.read"
	| "inventory.read"
	| "items.read"
	| "items.write"
	| "categories.read"
	| "categories.write"
	| "brands.read"
	| "brands.write"
	| "units.read"
	| "units.write"
	| "stock.read"
	| "serial.read"
	| "transfers.read"
	| "transfers.write"
	| "adjustments.read"
	| "adjustments.write"
	| "sales.read"
	| "sales.write"
	| "purchases.read"
	| "purchases.write"
	| "reports.read"
	| "integrations.read"
	| "users.read"
	| "users.write"
	| "roles.read"
	| "roles.write"
	| "tax.read"
	| "tax.write"
	| "locations.read"
	| "locations.write"
	| "suppliers.read"
	| "suppliers.write"
	| "settings.read";

export const adminPermissions: Permission[] = [
	"dashboard.read",
	"inventory.read",
	"items.read",
	"items.write",
	"categories.read",
	"categories.write",
	"brands.read",
	"brands.write",
	"units.read",
	"units.write",
	"stock.read",
	"serial.read",
	"transfers.read",
	"transfers.write",
	"adjustments.read",
	"adjustments.write",
	"sales.read",
	"sales.write",
	"purchases.read",
	"purchases.write",
	"reports.read",
	"integrations.read",
	"users.read",
	"users.write",
	"roles.read",
	"roles.write",
	"tax.read",
	"tax.write",
	"locations.read",
	"locations.write",
	"suppliers.read",
	"suppliers.write",
	"settings.read",
];

export const defaultUserPermissions: Permission[] = [
	"dashboard.read",
	"inventory.read",
	"items.read",
	"categories.read",
	"brands.read",
	"units.read",
	"stock.read",
	"sales.read",
	"purchases.read",
	"reports.read",
];

export const routePermissions: Record<string, Permission> = {
	"/dashboard/integrations": "integrations.read",
	"/dashboard/inventory": "inventory.read",
	"/dashboard/inventory/adjustments": "adjustments.read",
	"/dashboard/inventory/brands": "brands.read",
	"/dashboard/inventory/categories": "categories.read",
	"/dashboard/inventory/current-stock": "stock.read",
	"/dashboard/inventory/items": "items.read",
	"/dashboard/inventory/low-stock": "stock.read",
	"/dashboard/inventory/transfers": "transfers.read",
	"/dashboard/inventory/units": "units.read",
	"/dashboard/purchases": "purchases.read",
	"/dashboard/reports": "reports.read",
	"/dashboard/sales": "sales.read",
	"/dashboard/settings": "settings.read",
	"/dashboard/settings/locations": "locations.read",
	"/dashboard/settings/roles": "roles.read",
	"/dashboard/settings/tax-rates": "tax.read",
	"/dashboard/settings/users": "users.read",
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
