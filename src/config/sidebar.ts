import {
	BarChart3,
	Boxes,
	LayoutDashboard,
	type LucideIcon,
	Package,
	Receipt,
	Settings,
	ShoppingCart,
	Truck,
	Users,
} from "lucide-react";
import type { Permission } from "@/config/permissions";

export interface SidebarItem {
	href: string;
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
		href: "/dashboard/products",
		icon: Package,
		permission: "products.read",
		title: "Sản phẩm",
	},
	{
		href: "/dashboard/inventory",
		icon: Boxes,
		permission: "inventory.read",
		title: "Tồn kho",
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
		href: "/dashboard/contacts",
		icon: Receipt,
		title: "Khách hàng & Nhà cung cấp",
	},
	{
		href: "/dashboard/users",
		icon: Users,
		permission: "users.read",
		title: "Người dùng",
	},
	{
		href: "/dashboard/settings",
		icon: Settings,
		permission: "settings.read",
		title: "Cài đặt",
	},
];
