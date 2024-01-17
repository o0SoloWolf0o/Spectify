import NextAuth from "next-auth";
import authConfig from "@/auth/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Role } from "@prisma/client";
import { getUserById } from "@/database/user";

const prisma = new PrismaClient();

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async signIn({ user }) {
			return true;
		},
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
				session.user.username = token.username as string | null;
				session.user.bio = token.bio as string;
				session.user.image = token.image as string;
				session.user.role = token.role as Role;
			}
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			token.username = existingUser.username;
			token.bio = existingUser.bio;
			token.image = existingUser.image;
			token.role = existingUser.role;
			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
});
