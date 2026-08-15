import { ShoppingCart } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Bán hàng" };

export default function SalesPage() {
	return (
		<ModulePlaceholder
			description="Tạo đơn bán và hóa đơn với tồn kho cập nhật tự động."
			icon={ShoppingCart}
			title="Bán hàng"
		/>
	);
}
