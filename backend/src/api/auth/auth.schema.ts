import { z } from "zod"

const emailSchema = z
  .string()
  .email()
  .refine(
    (email) => {
      const parts = email.split("@")
      return parts.length === 2 && parts[1].includes(".")
    },
    {
      message: "Invalid email format. Must contain '@' and '.' in the domain part.",
    },
  )

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required"),
})

export const verifyOTPSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6),
})

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
})

