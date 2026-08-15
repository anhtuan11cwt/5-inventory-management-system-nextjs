import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tạo ứng dụng Next.js",
  description: "Được tạo bởi create next app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
