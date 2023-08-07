import NextAuth, { AuthOptions, NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
// import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as AuthOptions["adapter"],
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "email",
    //       type: "email",
    //       placeholder: "admin@gallry.io",
    //     },
    //     password: { label: "password", type: "password", placeholder: "***" },
    //   },
    //   async authorize(credentials, req) {
    //     const user = await signInEmailPassword(
    //       credentials!.email,
    //       credentials!.password
    //     ) as User;
    //     user.

    //     if (user) {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ user }) {
      return true;
    },
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token?.email! },
      });

      if (dbUser?.isActive === false) {
        throw new Error("Usuario inactivo");
      }

      const role = await prisma.role.findUnique({
        where: { id: dbUser?.roleId! },
      });
      token.role = role!;
      token.id = dbUser?.id!;
      return token;
    },
    async session({ session, token, user }) {
      if (session && session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
