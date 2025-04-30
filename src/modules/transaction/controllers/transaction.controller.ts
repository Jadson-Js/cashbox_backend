import { Request, Response } from 'express';
import { FindTransactionByUserIdService } from '../services/findByUserId-transaction.service';
import { CreateTransactionService } from '../services/create-transaction.service';
import { UpdateTransactionService } from '../services/update-transaction.service';
import { DeleteTransactionService } from '../services/delete-transaction.service';

export class TransactionController {
  public constructor(
    private readonly findTransactionByUserIdService: FindTransactionByUserIdService,
    private readonly createTransactionService: CreateTransactionService,
    private readonly updateTransactionService: UpdateTransactionService,
    private readonly deleteTransactionService: DeleteTransactionService,
  ) {}

  public async findByUserId(req: Request, res: Response): Promise<Response> {
    const data = { user_id: req.user_id as string };

    const response = await this.findTransactionByUserIdService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(200).json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = {
      amount: req.body.amount,
      type: req.body.type,
      description: req.body.description,
      transaction_date: req.body.transaction_date,
      user_id: req.user_id as string,
      category_id: req.body.category_id,
    };

    const response = await this.createTransactionService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(201).json({ response });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = {
      id: req.params.id,
      amount: req.body.amount,
      type: req.body.type,
      description: req.body.description,
      transaction_date: req.body.transaction_date,
      user_id: req.user_id as string,
      category_id: req.body.category_id,
    };

    const response = await this.updateTransactionService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(200).json({ response });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const data = {
      user_id: req.user_id as string,
      id: req.params.id,
    };

    const response = await this.deleteTransactionService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(204).json({ response });
  }
}
