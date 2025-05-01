import z from "zod";

export const emailRegistrationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password is required and must be at least 8 digits"),
});

export type EmailRegistrationSchemaType = z.infer<
  typeof emailRegistrationSchema
>;
