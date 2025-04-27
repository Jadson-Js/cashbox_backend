export interface FindByEmailUserInput {
  email: string;
}

export interface FindByEmailUserOutput {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
