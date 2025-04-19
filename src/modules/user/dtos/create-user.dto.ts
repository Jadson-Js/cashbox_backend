export interface CreateUserInput {
  email: string;
  password: string;
}

export interface CreateUserOutput {
  id: string;
  email: string;
}
