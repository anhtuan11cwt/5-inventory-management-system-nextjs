import { BarChart3 } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Báo cáo" };

export default function ReportsPage() {
	return (
		<ModulePlaceholder
			description="Báo cáo giá trị tồn kho, biến động, bán hàng và mua hàng."
			icon={BarChart3}
			title="Báo cáo & Phân tích"
		/>
	);
}
