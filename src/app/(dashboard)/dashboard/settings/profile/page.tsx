import { UserRound } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Hồ sơ" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Cập nhật thông tin cá nhân của bạn."
			icon={UserRound}
			title="Hồ sơ"
		/>
	);
}
