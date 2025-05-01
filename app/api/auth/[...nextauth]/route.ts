/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { omit } from "lodash";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = await NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) return null;

        const isValid = await compare(
          String(credentials?.password),
          String(user?.password)
        );

        if (!isValid) return null;

        const userData = omit(user, ["otpToken", "otpExpiresAt", "password"]);

        console.log("data -> ", { credentials, user: userData });

        return userData;
      },
    }),
  ],
  pages: { signIn: "/auth", error: "/auth", signOut: "/" },
});

export { handler as GET, handler as POST };
