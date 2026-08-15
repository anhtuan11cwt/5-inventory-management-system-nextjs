import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { auth } from "@/config/auth";

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await auth();

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<div className="flex min-h-svh flex-col bg-muted/30">
			<Topbar />
			<main className="flex-1 px-4 py-6 sm:px-6 lg:pr-8 lg:pl-[18rem]">
				{children}
			</main>
		</div>
	);
}
