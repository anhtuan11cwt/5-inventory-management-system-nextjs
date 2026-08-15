import type { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			role: "ADMIN" | "USER";
			organizationId: string;
			organizationName: string;
		} & DefaultSession["user"];
	}

	interface User {
		organizationId: string;
		organizationName: string;
		role: "ADMIN" | "USER";
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		organizationId: string;
		organizationName: string;
		role: "ADMIN" | "USER";
	}
}
