import { Request, Response } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export const HttpMethod = {
  get: 'get' as HttpMethod,
  post: 'post' as HttpMethod,
  put: 'put' as HttpMethod,
  delete: 'delete' as HttpMethod,
} as const;

export interface Route {
  getHandler(): (req: Request, res: Response) => Promise<void>;
  getPath(): string;
  getMethod(): HttpMethod;
}
