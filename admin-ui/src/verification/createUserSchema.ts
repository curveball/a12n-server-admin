// src/validation/createUserSchema.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  nickname: z.string().min(1, { message: 'Nickname is required' }),
  email: z.string().email({ message: 'A valid email address is required' }),
});

export type CreateUser = z.infer<typeof createUserSchema>;