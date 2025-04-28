import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { verifyAccessToken } from '../utils/jwt';
import { Result, AppError, UnauthorizedError } from '../utils/error';

// Extend the Request interface to include the 'id' property
declare global {
  namespace Express {
    interface Request {
      user_id?: string;
    }
  }
}

// Interface para o token decodificado
interface DecodedToken extends JwtPayload {
  user_id: string;
}

// Middleware de autenticação
export function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    Result.fail(new UnauthorizedError());
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token) as DecodedToken;

    if (!decoded || !decoded.user_id) {
      Result.fail(new UnauthorizedError());
      return;
    }

    req.user_id = decoded.user_id;
    next();
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
}
