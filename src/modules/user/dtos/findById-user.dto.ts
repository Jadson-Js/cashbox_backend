export interface FindByIdUserInput {
  id: string;
}

export interface FindByIdUserOutput {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
