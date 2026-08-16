import { Globe, Mail, Share2, Users } from "lucide-react";
import Link from "next/link";

import { getCurrentUsersCount } from "@/actions/users/count";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";

const productLinks = [
	{ href: "#features", label: "Tính năng" },
	{ href: "#comparison", label: "So sánh" },
	{ href: "#pricing", label: "Bảng giá" },
	{ href: "#faq", label: "Câu hỏi thường gặp" },
];

const companyLinks = [
	{ href: "#", label: "Về chúng tôi" },
	{ href: "#", label: "Blog" },
	{ href: "#", label: "Tuyển dụng" },
	{ href: "#", label: "Liên hệ" },
];

export async function Footer() {
	const usersCount = await getCurrentUsersCount();

	return (
		<footer className="border-border border-t bg-muted/50">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
					<div>
						<Logo />
						<p className="mt-4 max-w-sm text-muted-foreground text-sm">
							{siteConfig.slogan}. Theo dõi tồn kho theo thời gian thực, quản lý
							nhiều địa điểm và tạo báo cáo giúp doanh nghiệp tăng trưởng.
						</p>
						<div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm">
							<Users className="size-4 text-rose-600" />
							{usersCount > 0 ? (
								<span className="font-medium text-foreground">
									{usersCount}
								</span>
							) : null}
							<span className="text-muted-foreground">
								{usersCount > 0
									? "người dùng đang quản lý kho hàng"
									: "Tham gia Inventory Pro ngay hôm nay"}
							</span>
						</div>
						<div className="mt-6 flex items-center gap-2">
							<a
								aria-label="Twitter"
								className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
								href="https://twitter.com"
								rel="noreferrer"
								target="_blank"
							>
								<Share2 className="size-4" />
							</a>
							<a
								aria-label="GitHub"
								className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
								href="https://github.com"
								rel="noreferrer"
								target="_blank"
							>
								<Globe className="size-4" />
							</a>
							<a
								aria-label="Hỗ trợ qua email"
								className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
								href={`mailto:${siteConfig.contactEmail}`}
							>
								<Mail className="size-4" />
							</a>
						</div>
					</div>

					<div>
						<p className="font-semibold text-sm">Sản phẩm</p>
						<ul className="mt-4 space-y-2.5">
							{productLinks.map((link) => (
								<li key={link.label}>
									<Link
										className="text-muted-foreground text-sm transition-colors hover:text-foreground"
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className="font-semibold text-sm">Công ty</p>
						<ul className="mt-4 space-y-2.5">
							{companyLinks.map((link) => (
								<li key={link.label}>
									<Link
										className="text-muted-foreground text-sm transition-colors hover:text-foreground"
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-border border-t pt-6 sm:flex-row">
					<p className="text-muted-foreground text-sm">
						© {new Date().getFullYear()} {siteConfig.name}. Bảo lưu mọi quyền.
					</p>
					<p className="text-muted-foreground text-sm">
						{siteConfig.phone} · {siteConfig.contactEmail}
					</p>
				</div>
			</div>
		</footer>
	);
}
