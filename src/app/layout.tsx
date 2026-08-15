import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	description: "Được tạo bởi create next app",
	title: "Tạo ứng dụng Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="vi">
			<body className="flex min-h-full flex-col">{children}</body>
		</html>
	);
}
