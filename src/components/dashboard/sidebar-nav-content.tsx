"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { filteredSidebarLinks, type SidebarItem } from "@/config/sidebar";
import { usePermission } from "@/hooks/use-permission";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
	if (href === "/dashboard") return pathname === href;
	return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ item, pathname }: { item: SidebarItem; pathname: string }) {
	const active = isActive(pathname, item.href ?? "");

	return (
		<Link
			aria-current={active ? "page" : undefined}
			className={cn(
				"flex min-h-10 items-center gap-2.5 rounded-md px-3 font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
				active
					? "bg-sidebar-accent text-sidebar-accent-foreground"
					: "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
			)}
			href={item.href ?? "/dashboard"}
		>
			<item.icon className="size-4 shrink-0" />
			{item.title}
		</Link>
	);
}

function NavGroup({ item, pathname }: { item: SidebarItem; pathname: string }) {
	const groupActive =
		item.items?.some((child) => isActive(pathname, child.href ?? "")) ?? false;

	return (
		<div className="space-y-1">
			<p
				className={cn(
					"flex min-h-9 items-center gap-2.5 rounded-md px-3 font-semibold text-xs uppercase tracking-wider",
					groupActive
						? "text-sidebar-accent-foreground"
						: "text-sidebar-foreground/50",
				)}
			>
				<item.icon className="size-4 shrink-0" />
				{item.title}
			</p>
			<div className="ml-3 space-y-0.5 border-sidebar-border border-l pl-2">
				{item.items?.map((child) => (
					<NavLink item={child} key={child.href} pathname={pathname} />
				))}
			</div>
		</div>
	);
}

export function SidebarNavContent() {
	const pathname = usePathname();
	const { permissions } = usePermission();

	const items = filteredSidebarLinks(permissions);

	function handleSignOut() {
		toast.success("Đã đăng xuất thành công");
		signOut({ callbackUrl: "/login" });
	}

	return (
		<div className="flex h-full flex-col gap-4 p-4">
			<Link
				className="mb-2 flex items-center gap-2 rounded-md px-2 py-1.5 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
				href="/dashboard"
			>
				<Logo />
			</Link>

			<div className="no-scrollbar flex-1 overflow-y-auto">
				<nav aria-label="Bảng điều khiển" className="space-y-1">
					{items.map((item) =>
						item.items ? (
							<NavGroup item={item} key={item.title} pathname={pathname} />
						) : (
							<NavLink item={item} key={item.href} pathname={pathname} />
						),
					)}
				</nav>
			</div>

			<div className="border-sidebar-border border-t pt-3">
				<Button
					className="w-full justify-start text-muted-foreground"
					onClick={handleSignOut}
					variant="ghost"
				>
					<LogOut />
					Đăng xuất
				</Button>
			</div>
		</div>
	);
}
