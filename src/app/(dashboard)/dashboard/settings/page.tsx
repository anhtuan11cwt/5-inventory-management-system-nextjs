import { Settings } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Cài đặt" };

export default function SettingsPage() {
	return (
		<ModulePlaceholder
			cta="Lưu thay đổi"
			description="Thông tin tổ chức, tiền tệ, múi giờ và tùy chọn."
			icon={Settings}
			title="Cài đặt"
		/>
	);
}
