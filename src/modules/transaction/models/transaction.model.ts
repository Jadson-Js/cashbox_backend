import { Decimal } from '@prisma/client/runtime/library';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Transaction {
  id: string;
  amount: Decimal;
  type: TransactionType;
  description?: string;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  category_id: string;
}
