import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: LayoutProps<"/">) {
	return (
		<>
			<Navbar />
			<main className="flex-1">{children}</main>
			<Footer />
		</>
	);
}
