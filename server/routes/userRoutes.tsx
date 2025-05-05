import { StatusCode } from "@/constants/status-codes";
import prisma from "@/lib/prisma";
import { Hono } from "hono";

const userRoutes = new Hono();

// Get all users
userRoutes.get("/", async (context) => {
  const { json, status } = context;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      image: true,
      emailVerified: true,
      accountVerified: true,
    },
  });

  status(StatusCode.RESOURCE_RETRIEVED);
  return json({
    status: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

// Delete one user
userRoutes.delete("/:userId", async (context) => {
  const { json, status, req } = context;
  const { userId } = req.param();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || !userId) {
    status(StatusCode.BAD_REQUEST);
    return json({
      status: false,
      message: `User with ID '${userId}' not found!`,
    });
  }

  status(StatusCode.RESOURCE_RETRIEVED);
  return json({
    status: true,
    message: "User deleted successfully",
    data: user,
  });
});

export default userRoutes;
