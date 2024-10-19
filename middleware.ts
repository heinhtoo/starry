export const config = {
  matcher: ["/((?!api|assets|_next/static|_next/image|favicon.ico).*)"],
};

export { auth as middleware } from "@/auth";
