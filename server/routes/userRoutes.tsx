import { StatusCode } from "@/constants/status-codes";
import prisma from "@/lib/prisma";
import { Hono } from "hono";

const userRoutes = new Hono();

// Get all users
userRoutes.get("/", async (context) => {
  const users = await prisma.user.findMany({
    // include: {
    //   posts: true,
    // },
    select: {
      id: true,
      email: true,
      name: true,
      accountVerified: true,
    },
  });

  context.status(StatusCode.RESOURCE_RETRIEVED);
  return context.json({
    status: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

export default userRoutes;
