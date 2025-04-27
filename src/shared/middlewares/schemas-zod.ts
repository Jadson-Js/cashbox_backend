import { z } from 'zod';

// USER
export const email = z.object({
  email: z.string().email(),
});
export const password = z.object({
  password: z.string().min(6).max(32),
});
export const signupSchema = email.merge(password);
export const loginSchema = email.merge(password);

// CATEGORY
export const id = z.object({
  id: z.string(),
});
export const icon_svg = z.object({
  icon_svg: z.string(),
});
export const title = z.object({
  title: z.string(),
});
export const color = z.object({
  color: z.string(),
});
export const createSchema = icon_svg.merge(title).merge(color);
export const updateSchemaParams = id;
export const updateSchemaBody = icon_svg.merge(title).merge(color);
