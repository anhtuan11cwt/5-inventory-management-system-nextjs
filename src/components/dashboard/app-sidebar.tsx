"use client";

import { SidebarNavContent } from "@/components/dashboard/sidebar-nav-content";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export function AppSidebar({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<>
			<aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-sidebar-border border-r bg-sidebar lg:block">
				<SidebarNavContent />
			</aside>

			<Sheet onOpenChange={onOpenChange} open={open}>
				<SheetContent
					className="w-72 gap-0 overflow-y-auto bg-sidebar p-0"
					showCloseButton={false}
					side="left"
				>
					<SheetTitle className="sr-only">
						Điều hướng bảng điều khiển
					</SheetTitle>
					<SidebarNavContent />
				</SheetContent>
			</Sheet>
		</>
	);
}
