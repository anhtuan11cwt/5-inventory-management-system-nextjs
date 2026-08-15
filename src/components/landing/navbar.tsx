"use client";

import {
	ArrowRight,
	ChevronDown,
	LayoutDashboard,
	LogOut,
	Menu,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
	{ href: "#features", label: "Tính năng" },
	{ href: "#comparison", label: "So sánh" },
	{ href: "#pricing", label: "Bảng giá" },
	{ href: "#faq", label: "Câu hỏi thường gặp" },
];

export function Navbar() {
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);

	const user = session?.user;
	const initials = (user?.name ?? "?")
		.split(" ")
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	function handleSignOut() {
		toast.success("Đã đăng xuất thành công");
		signOut({ callbackUrl: "/login" });
	}

	return (
		<header className="sticky top-0 z-40 w-full border-border/60 border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
			<nav
				aria-label="Điều hướng chính"
				className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
			>
				<Link
					className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
					href="/"
				>
					<Logo />
				</Link>

				<ul className="hidden items-center gap-1 md:flex">
					{navItems.map((item) => (
						<li key={item.href}>
							<Link
								className="rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
								href={item.href}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>

				{user ? (
					<div className="hidden items-center gap-2 md:flex">
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
										<span className="hidden max-w-40 truncate font-medium text-sm lg:inline">
											{user.name}
										</span>
										<ChevronDown className="hidden size-3.5 text-muted-foreground lg:block" />
									</Button>
								}
							/>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuGroup>
									<DropdownMenuLabel>
										<p className="font-medium text-sm">{user.name}</p>
										<p className="font-normal text-muted-foreground text-xs">
											{user.organizationName}
										</p>
										<p className="font-normal text-muted-foreground text-xs">
											{user.email}
										</p>
									</DropdownMenuLabel>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem render={<Link href="/dashboard" />}>
									<LayoutDashboard />
									Bảng điều khiển
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleSignOut}>
									<LogOut />
									Đăng xuất
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				) : (
					<div className="hidden items-center gap-2 md:flex">
						<Button
							nativeButton={false}
							render={<Link href="/login" />}
							size="sm"
							variant="ghost"
						>
							Đăng nhập
						</Button>
						<Button
							nativeButton={false}
							render={<Link href="/register" />}
							size="sm"
						>
							Dùng thử miễn phí
							<ArrowRight />
						</Button>
					</div>
				)}

				{/* Mobile menu */}
				<Sheet onOpenChange={setOpen} open={open}>
					<SheetTrigger
						render={
							<Button
								aria-label="Mở menu"
								className="md:hidden"
								size="icon"
								variant="outline"
							>
								<Menu />
							</Button>
						}
					/>
					<SheetContent
						className="w-[85%] max-w-sm overflow-y-auto"
						side="right"
					>
						<SheetHeader className="border-border/60 border-b">
							<SheetTitle className="flex items-center gap-2">
								<Logo />
							</SheetTitle>
						</SheetHeader>

						{user && (
							<div className="flex items-center gap-3 px-2 pt-2">
								<Avatar className="size-10">
									<AvatarFallback className="bg-primary text-primary-foreground">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="min-w-0">
									<p className="truncate font-medium">{user.name}</p>
									<p className="truncate text-muted-foreground text-xs">
										{user.email}
									</p>
								</div>
							</div>
						)}

						<ul className="flex flex-col gap-1 px-2 pt-2">
							{navItems.map((item) => (
								<li key={item.href}>
									<SheetClose
										nativeButton={false}
										render={
											<Link
												className="flex min-h-11 items-center rounded-md px-3 font-medium text-base text-foreground transition-colors hover:bg-muted"
												href={item.href}
											>
												{item.label}
											</Link>
										}
									/>
								</li>
							))}
						</ul>

						<div className="mt-auto flex flex-col gap-2 border-border/60 border-t p-4">
							{user ? (
								<>
									<SheetClose
										nativeButton={false}
										render={
											<Link
												className={cn(
													buttonVariants({ variant: "outline" }),
													"w-full",
												)}
												href="/dashboard"
											>
												<LayoutDashboard />
												Bảng điều khiển
											</Link>
										}
									/>
									<Button
										className="w-full"
										onClick={handleSignOut}
										size="lg"
										variant="ghost"
									>
										<LogOut />
										Đăng xuất
									</Button>
								</>
							) : (
								<>
									<SheetClose
										nativeButton={false}
										render={
											<Link
												className={cn(
													buttonVariants({ variant: "outline" }),
													"w-full",
												)}
												href="/login"
											>
												Đăng nhập
											</Link>
										}
									/>
									<SheetClose
										nativeButton={false}
										render={
											<Link
												className={cn(
													buttonVariants({ size: "lg" }),
													"flex w-full items-center justify-center gap-1.5",
												)}
												href="/register"
											>
												Dùng thử miễn phí
												<ArrowRight />
											</Link>
										}
									/>
								</>
							)}
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
