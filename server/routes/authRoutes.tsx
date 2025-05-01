import { StatusCode } from "@/constants/status-codes";
import prisma from "@/lib/prisma";
import { emailRegistrationSchema } from "@/schema/authSchema";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { Hono } from "hono";

import { omit } from "lodash";

const authRoutes = new Hono();

// Get all users
authRoutes.post(
  "/sign-up",
  zValidator("json", emailRegistrationSchema),
  async ({ status, json, req }) => {
    const body = req.valid("json");

    const { email, password } = body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      status(StatusCode.UNAUTHORIZED_USER);
      return json({
        status: false,
        message: "An account with this email already exists",
        data: null,
      });
    }

    // Hash password with random generated salt
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const userData = omit(newUser, ["otpToken", "otpExpiresAt", "password"]);

    status(StatusCode.RESOURCE_CREATED);
    return json({
      status: true,
      message: "Account created successfully",
      data: {
        user: userData,
      },
    });
  }
);

export default authRoutes;
