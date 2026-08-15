"use client";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			{children}
			<Toaster duration={2000} position="top-center" richColors />
		</SessionProvider>
	);
}
