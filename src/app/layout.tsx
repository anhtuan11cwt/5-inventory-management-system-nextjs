import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	description: "Được tạo bởi create next app",
	title: "Tạo ứng dụng Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html className={cn("font-sans", inter.variable)} lang="vi">
			<body className="flex min-h-full flex-col">{children}</body>
		</html>
	);
}
