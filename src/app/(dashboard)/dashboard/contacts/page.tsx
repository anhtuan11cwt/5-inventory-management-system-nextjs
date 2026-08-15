import { Receipt } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Khách hàng & Nhà cung cấp" };

export default function ContactsPage() {
	return (
		<ModulePlaceholder
			description="Giữ liên hệ kinh doanh của bạn được tổ chức trong một nơi."
			icon={Receipt}
			title="Khách hàng & Nhà cung cấp"
		/>
	);
}
