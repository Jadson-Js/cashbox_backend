export interface FindTransactionOutput {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  category_id: string;
  transaction_date: Date;
}
