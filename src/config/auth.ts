import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { Permission } from "@/config/permissions";
import { db } from "@/lib/db";

const credentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const authConfig: NextAuthConfig = {
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.roleId = user.roleId;
				token.roleName = user.roleName;
				token.permissions = user.permissions;
				token.organizationId = user.organizationId;
				token.organizationName = user.organizationName;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.roleId = token.roleId as string;
				session.user.roleName = token.roleName as string;
				session.user.permissions = token.permissions as Permission[];
				session.user.organizationId = token.organizationId as string;
				session.user.organizationName = token.organizationName as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		Credentials({
			async authorize(rawCredentials) {
				const parsed = credentialsSchema.safeParse(rawCredentials);
				if (!parsed.success) return null;

				const { email, password } = parsed.data;
				const user = await db.user.findUnique({
					include: { role: true },
					where: { email: email.toLowerCase() },
				});

				if (!user) return null;
				if (!user.isVerified) return null;

				const passwordMatches = await bcrypt.compare(password, user.password);
				if (!passwordMatches) return null;

				return {
					email: user.email,
					id: user.id,
					name: user.name,
					organizationId: user.organizationId,
					organizationName: user.organizationName,
					permissions: user.role.permissions as Permission[],
					roleId: user.roleId,
					roleName: user.role.name,
				};
			},
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Mật khẩu", type: "password" },
			},
		}),
	],
	session: { strategy: "jwt" },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
