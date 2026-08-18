import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Tồn thấp" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Danh sách mặt hàng dưới mức tồn tối thiểu."
			icon={AlertTriangle}
			title="Tồn thấp"
		/>
	);
}
