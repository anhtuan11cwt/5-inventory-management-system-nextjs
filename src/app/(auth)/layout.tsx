import Link from "next/link";

import { Logo } from "@/components/logo";

export default function AuthLayout({ children }: LayoutProps<"/">) {
	return (
		<main className="flex min-h-svh flex-col bg-muted/40">
			<div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
				<Link
					className="mx-auto mb-8 rounded-md focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
					href="/"
				>
					<Logo />
				</Link>
				{children}
			</div>
		</main>
	);
}
