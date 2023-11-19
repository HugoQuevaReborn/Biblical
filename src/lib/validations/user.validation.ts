import { z } from "zod";

export const SignInValidation = z.object({
    email: z.string().email().min(3).max(50),
    password: z.string().min(1),
})

export const SignUpValidation = z.object({
    name: z.string().min(3,"Name is too short!").max(40,"Name is too long!"),
    username: z.string().min(3,"Username is too short!").max(40,"Username is too long!"),
    email: z.string().email("Email must be valid!"),
    password: z.string().min(12,"Password must at least contain 12 characters"),
})