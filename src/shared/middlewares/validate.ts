import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export const validate = <T>(
  schema: ZodSchema<T>,
  target: 'body' | 'query' | 'params' = 'body',
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: result.error.flatten(),
      });
      return;
    }

    req[target] = result.data;
    next();
  };
};
