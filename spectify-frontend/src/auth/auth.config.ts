import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "@/schemas";
import { getUserByEmail } from "@/database/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(creadentials) {
                const valid = signInSchema.safeParse(creadentials);
                if (valid.success) {
                    const { email, password } = valid.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) {
                        return null;
                    }

                    const isValid = await bcrypt.compare(password, user.password);

                    if (isValid) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
