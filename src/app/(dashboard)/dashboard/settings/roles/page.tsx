import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Vai trò & quyền" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Quản lý vai trò và phân quyền cho người dùng."
			icon={ShieldCheck}
			title="Vai trò & quyền"
		/>
	);
}
