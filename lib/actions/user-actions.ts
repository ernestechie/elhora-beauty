"use server";

import prisma from "../prisma";

export async function getUserFromSession(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
