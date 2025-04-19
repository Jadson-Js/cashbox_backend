import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../config/environment';

const accessToken = ACCESS_TOKEN_SECRET || 'access-secret';
const refreshToken = REFRESH_TOKEN_SECRET || 'refresh-secret';

if (!REFRESH_TOKEN_SECRET || !ACCESS_TOKEN_SECRET) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined');
}

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, accessToken, { expiresIn: '15m' });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, refreshToken, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string): string | JwtPayload {
  return jwt.verify(token, accessToken);
}

export function verifyRefreshToken(token: string): string | JwtPayload {
  return jwt.verify(token, refreshToken);
}
