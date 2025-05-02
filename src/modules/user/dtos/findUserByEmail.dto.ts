export interface FindUserByEmailInput {
  email: string;
}

export interface FindUserByEmailOutput {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
