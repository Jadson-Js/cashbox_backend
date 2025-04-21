export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  category: string;
  description?: string;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
}
