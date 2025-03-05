import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  profile_picture: z.string().url().optional(),
});
