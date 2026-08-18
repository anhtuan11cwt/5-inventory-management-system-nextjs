import { Layers } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Tồn kho hiện tại" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Theo dõi số lượng tồn kho theo từng địa điểm."
			icon={Layers}
			title="Tồn kho hiện tại"
		/>
	);
}
