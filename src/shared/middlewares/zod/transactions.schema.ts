import { z } from 'zod';
import { TransactionType } from '../../../modules/transaction/models/transaction.model';

export const id = z.object({
  id: z.string(),
});
export const amount = z.object({
  amount: z.number(),
});
export const type = z.object({
  type: z.nativeEnum(TransactionType),
});
export const description = z.object({
  description: z.string().optional(),
});
export const transaction_date = z.object({
  transaction_date: z.string().or(z.date()).pipe(z.coerce.date()),
});

export const category_id = z.object({
  category_id: z.string(),
});

export const createSchemaBody = amount
  .merge(type)
  .merge(description)
  .merge(transaction_date)
  .merge(category_id);

export const updateSchemaParams = id;

export const updateSchemaBody = amount
  .merge(type)
  .merge(description)
  .merge(transaction_date)
  .merge(category_id);

export const deleteSchemaParams = id;
