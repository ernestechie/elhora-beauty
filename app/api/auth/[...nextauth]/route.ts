import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Passwordless login with email & magic links
    EmailProvider({
      maxAge: 60 * 60 * 24 * 7, // 7 days expiry
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth",
    signOut: "/shop",
    newUser: "/shop",
    verifyRequest: "/verify-email",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      // This is what gets returned when we call the useSession hook from "next-auth/react"
      return {
        ...session,
        id: user.id,
        email: user.email,
      };
    },
  },
});

export { handler as GET, handler as POST };
