export interface CreateTransactionInput {
  user_id: string;
  amount: number;
  type: string;
  category_id: string;
  description?: string;
  transaction_date: Date;
}

export interface CreateTransactionOutput {
  id: string;
}
