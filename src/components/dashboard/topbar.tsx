"use client";

import { Building2, ChevronDown, LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
	const { data: session } = useSession();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	function handleSignOut() {
		toast.success("Đã đăng xuất thành công");
		signOut({ callbackUrl: "/login" });
	}

	const initials = (session?.user?.name ?? "?")
		.split(" ")
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	return (
		<>
			<AppSidebar onOpenChange={setSidebarOpen} open={sidebarOpen} />

			<header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-border border-b bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:pl-[17rem]">
				<Button
					aria-expanded={sidebarOpen}
					aria-label="Mở menu điều hướng"
					className="lg:hidden"
					onClick={() => setSidebarOpen(true)}
					size="icon"
					variant="outline"
				>
					<Menu />
				</Button>

				<div className="hidden min-w-0 items-center gap-2 text-muted-foreground text-sm sm:flex">
					<Building2 className="size-4 shrink-0" />
					<span className="truncate font-medium text-foreground">
						{session?.user?.organizationName ?? "Tổ chức"}
					</span>
				</div>

				<div className="ml-auto flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									className="gap-2 rounded-full px-1.5 data-open:bg-muted"
									variant="ghost"
								>
									<Avatar className="size-8">
										<AvatarFallback className="bg-primary text-primary-foreground text-xs">
											{initials}
										</AvatarFallback>
									</Avatar>
									<span className="hidden max-w-40 truncate font-medium text-sm sm:inline">
										{session?.user?.name}
									</span>
									<ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
								</Button>
							}
						/>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuGroup>
								<DropdownMenuLabel>
									<p className="font-medium text-sm">{session?.user?.name}</p>
									<p className="font-normal text-muted-foreground text-xs">
										{session?.user?.email}
									</p>
								</DropdownMenuLabel>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleSignOut}>
								<LogOut />
								Đăng xuất
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</>
	);
}
