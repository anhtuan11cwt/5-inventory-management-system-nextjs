import { KeyRound } from "lucide-react";
import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";

export const metadata: Metadata = { title: "Đổi mật khẩu" };

export default function Page() {
	return (
		<ModulePlaceholder
			description="Thay đổi mật khẩu đăng nhập."
			icon={KeyRound}
			title="Đổi mật khẩu"
		/>
	);
}
