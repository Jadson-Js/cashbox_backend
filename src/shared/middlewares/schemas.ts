import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6).max(32),
});

export type SignupDTO = z.infer<typeof signupSchema>;
