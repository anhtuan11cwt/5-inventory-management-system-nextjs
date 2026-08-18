import { MapPin } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Địa điểm" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Quản lý kho, cửa hàng và địa điểm ảo."
			icon={MapPin}
			title="Địa điểm"
		/>
	);
}
