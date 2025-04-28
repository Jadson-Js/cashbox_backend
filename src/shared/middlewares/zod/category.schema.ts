import { z } from 'zod';

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
export const createSchemaBody = icon_svg.merge(title).merge(color);
export const updateSchemaParams = id;
export const updateSchemaBody = icon_svg.merge(title).merge(color);
export const deleteSchemaParams = id;
