export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserOutput {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
