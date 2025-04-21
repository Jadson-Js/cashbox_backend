import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

export class TransactionController {
  public constructor(private userService: TransactionService) {}

  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.userService.find();
      return res.status(200).json(response);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }
}
