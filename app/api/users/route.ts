import { baseURL } from "@/lib/urlHelper";
import prisma from "@/prisma/prisma";

export async function GET() {
  console.log(baseURL);
  const users = await prisma.user.findMany({});
  return Response.json(users);
}
