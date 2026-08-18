import { Building2 } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Công ty" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Thông tin tổ chức và cấu hình công ty."
			icon={Building2}
			title="Công ty"
		/>
	);
}
