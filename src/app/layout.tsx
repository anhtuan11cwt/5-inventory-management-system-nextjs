import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	description: siteConfig.description,
	metadataBase: new URL(siteConfig.url),
	openGraph: {
		description: siteConfig.description,
		locale: "vi_VN",
		siteName: siteConfig.name,
		title: siteConfig.name,
		type: "website",
		url: siteConfig.url,
	},
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	twitter: {
		card: "summary_large_image",
		description: siteConfig.description,
		title: siteConfig.name,
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html className={cn("font-sans", inter.variable)} lang="vi">
			<body className="flex min-h-full flex-col">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
