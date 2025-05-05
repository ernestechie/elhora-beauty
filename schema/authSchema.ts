import z from "zod";

export const emailRegistrationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export type EmailRegistrationSchemaType = z.infer<
  typeof emailRegistrationSchema
>;
