// shared/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Note que retornamos void, não Response
  // Se for um AppError, use suas propriedades
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
    return; // Retorne após enviar a resposta
  }

  // Para outros erros
  console.error('Unexpected error:', err);
  res.status(500).json({
    error: 'InternalServerError',
    message: 'An unexpected error occurred',
  });
}
