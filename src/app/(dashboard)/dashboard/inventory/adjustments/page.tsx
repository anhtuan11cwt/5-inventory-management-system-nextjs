import { SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Điều chỉnh tồn kho" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Ghi nhận và điều chỉnh sai lệch tồn kho."
			icon={SlidersHorizontal}
			title="Điều chỉnh tồn kho"
		/>
	);
}
