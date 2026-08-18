import { ArrowLeftRight } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Chuyển kho" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Luân chuyển hàng hóa giữa các địa điểm."
			icon={ArrowLeftRight}
			title="Chuyển kho"
		/>
	);
}
