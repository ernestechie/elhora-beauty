import { StatusCode } from "@/constants/status-codes";
import prisma from "@/lib/prisma";
import { emailRegistrationSchema } from "@/schema/authSchema";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { Hono } from "hono";

import { omit } from "lodash";

const authRoutes = new Hono();

export default authRoutes;
