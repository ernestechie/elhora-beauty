import { User } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export default class UserEntity {
  private userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  get user(): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: this.userId,
      },
    });
  }

  async createOtpCodeToken() {
    const user = await this.user;

    //   .update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     otpToken: "",
    //     otpExpiresAt: "",
    //   },
    // });
    // }
  }
}
