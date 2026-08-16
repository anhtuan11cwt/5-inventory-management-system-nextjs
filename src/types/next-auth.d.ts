import type { DefaultSession } from "next-auth";
import type { Permission } from "@/config/permissions";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			roleId: string;
			roleName: string;
			permissions: Permission[];
			organizationId: string;
			organizationName: string;
		} & DefaultSession["user"];
	}

	interface User {
		organizationId: string;
		organizationName: string;
		permissions: Permission[];
		roleId: string;
		roleName: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		organizationId: string;
		organizationName: string;
		permissions: Permission[];
		roleId: string;
		roleName: string;
	}
}
