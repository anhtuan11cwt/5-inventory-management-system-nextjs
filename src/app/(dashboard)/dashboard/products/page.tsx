import { Package } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Sản phẩm" };

export default function ProductsPage() {
	return (
		<ModulePlaceholder
			description="Quản lý danh mục sản phẩm, mã SKU, biến thể và giá bán."
			icon={Package}
			title="Sản phẩm"
		/>
	);
}
