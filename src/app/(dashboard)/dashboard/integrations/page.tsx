import { Plug } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Tích hợp" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="POS, kế toán và cài đặt API."
			icon={Plug}
			title="Tích hợp"
		/>
	);
}
