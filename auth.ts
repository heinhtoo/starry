import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./prisma/prisma";
import NotionProvider from "next-auth/providers/notion";
import { NextResponse } from "next/server";
import { EmailConfig } from "next-auth/providers";
import type { Theme } from "@auth/core/types";
import { baseURL } from "./lib/urlHelper";

const protectedRoutes = ["/support", "/initialization"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    NotionProvider({
      clientId: process.env.AUTH_NOTION_ID,
      clientSecret: process.env.AUTH_NOTION_SECRET,
      redirectUri: process.env.AUTH_NOTION_REDIRECT_URI ?? "",
    }),
    {
      from: process.env.AUTH_MAIL_FROM!,
      // this is leave as blank because nextauth set options as required
      options: {},
      id: "http-email",
      name: "Email",
      type: "email",
      maxAge: 60 * 60 * 24, // Email link will expire in 24 hours
      async sendVerificationRequest(params: {
        identifier: string;
        url: string;
        expires: Date;
        provider: EmailConfig;
        token: string;
        theme: Theme;
        request: Request;
      }) {
        const response = await fetch(baseURL + "/api/auth/send-link", {
          // The body format will vary depending on provider, please see their documentation
          body: JSON.stringify({
            email: params.identifier,
            url: params.url,
          }),
          method: "POST",
        });

        if (!response.ok) {
          const { errors } = await response.json();
          throw new Error(JSON.stringify(errors));
        }
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // * Authorized Routes
    authorized({ request: { nextUrl }, auth }) {
      const pathname = nextUrl.pathname;
      const isLoggedIn = Boolean(auth);

      if (pathname.includes(".js") || pathname === "/") {
        return true;
      }
      // if the user is logged in and accessing login page redirect to home page
      if (pathname.startsWith("/login") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      // if the user is logged in and accessing register page redirect to home page
      if (pathname.startsWith("/register") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      const loginURL = new URL("/login", nextUrl);
      loginURL.searchParams.set("callbackURL", encodeURIComponent(pathname));
      if (
        protectedRoutes.find((url) => pathname.startsWith(url)) &&
        !isLoggedIn
      ) {
        return NextResponse.redirect(loginURL);
      }

      return !!auth;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
