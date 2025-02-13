import { z } from 'zod';

const emailSchema = z.string().email().refine((email) => {
  const parts = email.split('@');
  return parts.length === 2 && parts[1].includes('.');
}, {
  message: "Invalid email format. Must contain '@' and '.' in the domain part."
});

export const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

