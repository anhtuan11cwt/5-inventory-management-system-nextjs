import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	description: siteConfig.description,
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
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
