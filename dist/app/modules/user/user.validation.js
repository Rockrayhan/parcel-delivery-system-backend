"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleBlockUserZodSchema = exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
exports.createUserZodSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
    }),
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email("Invalid email format"),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .min(6, "Password must be at least 6 characters"),
    role: zod_1.z.enum(["admin", "sender", "receiver"], {
        required_error: "Role is required",
    }),
    isBlocked: zod_1.z.boolean().optional(),
});
exports.updateUserZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters").optional(),
    role: zod_1.z.enum(["admin", "sender", "receiver"]).optional(),
    isBlocked: zod_1.z.boolean().optional(),
});
exports.toggleBlockUserZodSchema = zod_1.z.object({
    isBlocked: zod_1.z.boolean({
        required_error: "isBlocked is required",
        invalid_type_error: "isBlocked must be a boolean",
    }),
});
