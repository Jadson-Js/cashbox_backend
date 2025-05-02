export interface CreateUserInput {
  email: string;
  password: string;
}

export interface CreateUserOutput {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
