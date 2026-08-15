import { Truck } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Mua hàng" };

export default function PurchasesPage() {
	return (
		<ModulePlaceholder
			description="Quản lý đơn mua hàng, nhà cung cấp và hàng nhận được."
			icon={Truck}
			title="Mua hàng"
		/>
	);
}
