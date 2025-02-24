import { z } from "zod";

const emailSchema = z
  .string()
  .email()
  .refine(
    (email) => {
      const parts = email.split("@");
      return parts.length === 2 && parts[1].includes(".");
    },
    {
      message: "Invalid email format. Must contain '@' and '.' in the domain part.",
    },
  );

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required"),
});

export const verifyOTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
  registrationData: registerSchema, // Include registration data
});

export const loginSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});

export const verifyForgotPasswordOTPSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be 6 digits"),
});

