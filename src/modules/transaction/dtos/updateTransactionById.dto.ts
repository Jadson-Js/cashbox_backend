import { Decimal } from '@prisma/client/runtime/library';
import { TransactionType } from '../models/transaction.model';

export interface UpdateTransactionByIdInput {
  id: string;
  amount: Decimal;
  type: TransactionType;
  description: string | null;
  transaction_date: Date;
  user_id: string;
  category_id: string;
}

export interface UpdateTransactionByIdOutput {
  id: string;
  amount: Decimal;
  type: TransactionType;
  description: string | null;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  category_id: string;
}
