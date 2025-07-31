import { z } from "zod";

export const createUserZodSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "sender", "receiver"], {
    required_error: "Role is required",
  }),
  isBlocked: z.boolean().optional(),
});
