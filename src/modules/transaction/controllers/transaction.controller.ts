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

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        user_id,
        amount,
        type,
        category_id,
        description,
        transaction_date,
      } = req.body;

      const data = {
        user_id,
        amount,
        type,
        category_id,
        description,
        transaction_date,
      };

      const response = await this.userService.create(data);
      return res.status(200).json(response);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      return res.status(400).json({ error: errorMessage });
    }
  }
}
