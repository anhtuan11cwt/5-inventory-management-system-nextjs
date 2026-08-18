import {
	AlertTriangle,
	ArrowLeftRight,
	BadgeCheck,
	BarChart3,
	Boxes,
	Building2,
	KeyRound,
	Layers,
	LayoutDashboard,
	type LucideIcon,
	MapPin,
	Package,
	Percent,
	Plug,
	Scale,
	Settings,
	ShieldCheck,
	ShoppingCart,
	SlidersHorizontal,
	Tags,
	Truck,
	UserRound,
	Users,
} from "lucide-react";
import { hasPermission, type Permission } from "@/config/permissions";

export interface SidebarItem {
	href?: string;
	icon: LucideIcon;
	items?: SidebarItem[];
	permission?: Permission;
	title: string;
}

export const sidebarNav: SidebarItem[] = [
	{
		href: "/dashboard",
		icon: LayoutDashboard,
		permission: "dashboard.read",
		title: "Bảng điều khiển",
	},
	{
		icon: Boxes,
		items: [
			{
				href: "/dashboard/inventory/items",
				icon: Package,
				permission: "items.read",
				title: "Mặt hàng",
			},
			{
				href: "/dashboard/inventory/categories",
				icon: Tags,
				permission: "categories.read",
				title: "Danh mục",
			},
			{
				href: "/dashboard/inventory/brands",
				icon: BadgeCheck,
				permission: "brands.read",
				title: "Thương hiệu",
			},
			{
				href: "/dashboard/inventory/units",
				icon: Scale,
				permission: "units.read",
				title: "Đơn vị tính",
			},
			{
				href: "/dashboard/inventory/current-stock",
				icon: Layers,
				permission: "stock.read",
				title: "Tồn kho hiện tại",
			},
			{
				href: "/dashboard/inventory/low-stock",
				icon: AlertTriangle,
				permission: "stock.read",
				title: "Tồn thấp",
			},
			{
				href: "/dashboard/inventory/transfers",
				icon: ArrowLeftRight,
				permission: "transfers.read",
				title: "Chuyển kho",
			},
			{
				href: "/dashboard/inventory/adjustments",
				icon: SlidersHorizontal,
				permission: "adjustments.read",
				title: "Điều chỉnh",
			},
		],
		permission: "inventory.read",
		title: "Kho hàng",
	},
	{
		href: "/dashboard/sales",
		icon: ShoppingCart,
		permission: "sales.read",
		title: "Bán hàng",
	},
	{
		href: "/dashboard/purchases",
		icon: Truck,
		permission: "purchases.read",
		title: "Mua hàng",
	},
	{
		href: "/dashboard/reports",
		icon: BarChart3,
		permission: "reports.read",
		title: "Báo cáo",
	},
	{
		href: "/dashboard/integrations",
		icon: Plug,
		permission: "integrations.read",
		title: "Tích hợp",
	},
	{
		icon: Settings,
		items: [
			{
				href: "/dashboard/settings/users",
				icon: Users,
				permission: "users.read",
				title: "Người dùng",
			},
			{
				href: "/dashboard/settings/roles",
				icon: ShieldCheck,
				permission: "roles.read",
				title: "Vai trò & quyền",
			},
			{
				href: "/dashboard/settings/tax-rates",
				icon: Percent,
				permission: "tax.read",
				title: "Thuế suất",
			},
			{
				href: "/dashboard/settings/locations",
				icon: MapPin,
				permission: "locations.read",
				title: "Địa điểm",
			},
			{
				href: "/dashboard/settings/company",
				icon: Building2,
				permission: "settings.read",
				title: "Công ty",
			},
			{
				href: "/dashboard/settings/profile",
				icon: UserRound,
				permission: "settings.read",
				title: "Hồ sơ",
			},
			{
				href: "/dashboard/settings/change-password",
				icon: KeyRound,
				permission: "settings.read",
				title: "Đổi mật khẩu",
			},
		],
		permission: "settings.read",
		title: "Cài đặt",
	},
];

export function filteredSidebarLinks(
	permissions: Permission[] | undefined,
): SidebarItem[] {
	return sidebarNav
		.map((item) => {
			const canSeeItem =
				!item.permission || hasPermission(permissions, item.permission);

			if (!item.items) {
				return canSeeItem ? item : null;
			}

			if (!canSeeItem) return null;

			const children = item.items.filter(
				(child) =>
					!child.permission || hasPermission(permissions, child.permission),
			);

			if (children.length === 0) return null;

			return { ...item, items: children };
		})
		.filter((item): item is SidebarItem => item !== null);
}
