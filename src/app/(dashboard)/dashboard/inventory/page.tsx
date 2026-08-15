import { Boxes } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Tồn kho" };

export default function InventoryPage() {
	return (
		<ModulePlaceholder
			description="Theo dõi tồn kho tại các địa điểm, điều chỉnh và chuyển kho."
			icon={Boxes}
			title="Tồn kho"
		/>
	);
}
