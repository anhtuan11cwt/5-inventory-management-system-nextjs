"use client";

import { Building2 } from "lucide-react";
import { useSession } from "next-auth/react";

export function OrganizationBanner() {
	const { data: session } = useSession();
	const user = session?.user;

	return (
		<div className="flex min-w-0 items-center gap-2 text-sm">
			<Building2 className="size-4 shrink-0 text-muted-foreground" />
			<div className="min-w-0">
				<p className="truncate font-medium text-foreground">
					{user?.organizationName ?? "Tổ chức"}
				</p>
				<p className="truncate text-muted-foreground text-xs">
					{user?.roleName ?? ""}
				</p>
			</div>
		</div>
	);
}
