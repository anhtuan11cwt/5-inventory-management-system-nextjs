import { Users } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Người dùng" };

export default function UsersPage() {
	return (
		<ModulePlaceholder
			description="Mời thành viên và quản lý quyền truy cập của họ."
			icon={Users}
			title="Người dùng"
		/>
	);
}
