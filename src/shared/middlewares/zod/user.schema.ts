import { z } from 'zod';

export const email = z.object({
  email: z.string().email(),
});
export const password = z.object({
  password: z.string().min(6).max(32),
});
export const signupSchemaBody = email.merge(password);
export const loginSchemaBody = email.merge(password);
