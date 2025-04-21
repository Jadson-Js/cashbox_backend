export interface FindTransactionOutput {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  category: string;
  transaction_date: Date;
}
