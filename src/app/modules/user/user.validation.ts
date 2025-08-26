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


export const updateUserZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z.enum(["admin", "sender", "receiver"]).optional(),
  isBlocked: z.boolean().optional(),
});

export const toggleBlockUserZodSchema = z.object({
  isBlocked: z.boolean({
    required_error: "isBlocked is required",
    invalid_type_error: "isBlocked must be a boolean",
  }),
});