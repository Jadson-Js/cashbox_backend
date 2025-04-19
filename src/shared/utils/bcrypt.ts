// src/utils/bcrypt.util.ts
import bcrypt from 'bcryptjs';

interface ComparePasswordInput {
  password: string;
  hashedPassword: string;
}

export function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Defina o número de saltos conforme necessário
  return bcrypt.hash(password, saltRounds);
}

export function comparePassword({
  password,
  hashedPassword,
}: ComparePasswordInput): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
