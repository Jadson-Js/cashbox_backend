import { Request, Response } from 'express';
import { FindTransactionsByUserIdService } from '../services/findTransactionByUserId.service';
import { CreateTransactionService } from '../services/createTransaction.service';
import { UpdateTransactionByIdService } from '../services/updateTransactionById.service';
import { DeleteTransactionByIdService } from '../services/deleteTransactionById.service';

export class TransactionController {
  public constructor(
    private readonly findTransactionsByUserIdService: FindTransactionsByUserIdService,
    private readonly createTransactionService: CreateTransactionService,
    private readonly updateTransactionByIdService: UpdateTransactionByIdService,
    private readonly deleteTransactionByIdService: DeleteTransactionByIdService,
  ) {}

  public async findByUserId(req: Request, res: Response): Promise<Response> {
    const data = { user_id: req.user_id as string };

    const response = await this.findTransactionsByUserIdService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(200).json(response.val);
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

    return res.status(201).json(response.val);
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

    const response = await this.updateTransactionByIdService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(200).json(response.val);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const data = {
      user_id: req.user_id as string,
      id: req.params.id,
    };

    const response = await this.deleteTransactionByIdService.execute(data);

    if (response.err) {
      return res
        .status(response.val.statusCode)
        .json({ error: response.val.message });
    }

    return res.status(204).json(response.val);
  }
}
