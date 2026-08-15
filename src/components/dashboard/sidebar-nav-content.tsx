"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarNav } from "@/config/sidebar";
import { usePermission } from "@/hooks/use-permission";
import { cn } from "@/lib/utils";

export function SidebarNavContent() {
	const pathname = usePathname();
	const { has } = usePermission();

	const items = sidebarNav.filter((item) => {
		if (!item.permission) return true;
		return has(item.permission);
	});

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

			<ScrollArea className="flex-1">
				<nav aria-label="Bảng điều khiển" className="space-y-1">
					{items.map((item) => {
						const active =
							pathname === item.href ||
							(pathname.startsWith(item.href) && item.href !== "/dashboard");
						return (
							<Link
								aria-current={active ? "page" : undefined}
								className={cn(
									"flex min-h-10 items-center gap-2.5 rounded-md px-3 font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
									active
										? "bg-sidebar-accent text-sidebar-accent-foreground"
										: "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
								)}
								href={item.href}
								key={item.href}
							>
								<item.icon className="size-4 shrink-0" />
								{item.title}
							</Link>
						);
					})}
				</nav>
			</ScrollArea>

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
