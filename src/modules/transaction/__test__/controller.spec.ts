// IMPORT DEPENDENCIES
import { Request, Response } from 'express';

// IMPORT CONTROLLER
import { TransactionController } from '../controllers/transaction.controller';

// IMPORT SERVICES
import { FindTransactionsByUserIdService } from '../services/findTransactionByUserId.service';
import { CreateTransactionService } from '../services/createTransaction.service';
import { UpdateTransactionByIdService } from '../services/updateTransactionById.service';
import { DeleteTransactionByIdService } from '../services/deleteTransactionById.service';

describe('TransactionController', () => {
  // DECLARE TYPES
  let transactionController: TransactionController;

  let findTransactionsByUserIdService: FindTransactionsByUserIdService;
  let createTransactionService: CreateTransactionService;
  let updateTransactionByIdService: UpdateTransactionByIdService;
  let deleteTransactionByIdService: DeleteTransactionByIdService;

  beforeEach(() => {
    // DECLARE METHODS OF SERVICES HOW MOCK
    findTransactionsByUserIdService = {
      execute: jest.fn(),
    } as unknown as FindTransactionsByUserIdService;
    createTransactionService = {
      execute: jest.fn(),
    } as unknown as CreateTransactionService;
    updateTransactionByIdService = {
      execute: jest.fn(),
    } as unknown as UpdateTransactionByIdService;
    deleteTransactionByIdService = {
      execute: jest.fn(),
    } as unknown as DeleteTransactionByIdService;

    transactionController = new TransactionController(
      findTransactionsByUserIdService,
      createTransactionService,
      updateTransactionByIdService,
      deleteTransactionByIdService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find transactions by user id with status 200 when service succeeds', async () => {
    // ARRANGE
    const req = { user_id: '1' } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const output = {
      ok: true,
      err: false,
      val: [
        {
          id: '1',
          amount: '100',
          type: 'INCOME',
          description: 'DESCRIPTION',
          transaction_date: '2021-01-01T01:01:01.000A',
          created_at: '2021-01-01T01:01:01.000A',
          updated_at: '2021-01-01T01:01:01.000A',
          user_id: '1',
          category_id: '1',
        },
      ],
    };

    // ACT
    (findTransactionsByUserIdService.execute as jest.Mock).mockResolvedValue(
      output,
    );
    await transactionController.findByUserId(req, res);

    // ASSERT
    expect(findTransactionsByUserIdService.execute).toHaveBeenCalledTimes(1);
    expect(findTransactionsByUserIdService.execute).toHaveBeenCalledWith({
      user_id: req.user_id,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(output);
  });

  it('should create transaction with status 201 when service succeeds', async () => {
    // ARRANGE
    const req = {
      user_id: '1',
      body: {
        amount: '100',
        type: 'INCOME',
        description: 'DESCRIPTION',
        transaction_date: '2021-01-01T01:01:01.000A',
        category_id: '1',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const output = {
      ok: true,
      err: false,
      val: {
        id: '1',
        amount: '100',
        type: 'INCOME',
        description: 'DESCRIPTION',
        transaction_date: '2021-01-01T01:01:01.000A',
        created_at: '2021-01-01T01:01:01.000A',
        updated_at: '2021-01-01T01:01:01.000A',
        user_id: '1',
        category_id: '1',
      },
    };

    // ACT
    (createTransactionService.execute as jest.Mock).mockResolvedValue(output);
    await transactionController.create(req, res);

    // ASSERT
    expect(createTransactionService.execute).toHaveBeenCalledTimes(1);
    expect(createTransactionService.execute).toHaveBeenCalledWith({
      ...req.body,
      user_id: req.user_id,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(output);
  });

  it('should update transaction with status 200 when service succeeds', async () => {
    // ARRANGE
    const req = {
      params: { id: '1' },
      body: {
        amount: '100',
        type: 'INCOME',
        description: 'DESCRIPTION',
        transaction_date: '2021-01-01T01:01:01.000A',
        category_id: '1',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const output = {
      ok: true,
      err: false,
      val: {
        id: '1',
        amount: '100',
        type: 'INCOME',
        description: 'DESCRIPTION',
        transaction_date: '2021-01-01T01:01:01.000A',
        created_at: '2021-01-01T01:01:01.000A',
        updated_at: '2021-01-01T01:01:01.000A',
        user_id: '1',
        category_id: '1',
      },
    };

    // ACT
    (updateTransactionByIdService.execute as jest.Mock).mockResolvedValue(
      output,
    );
    await transactionController.update(req, res);

    // ASSERT
    expect(updateTransactionByIdService.execute).toHaveBeenCalledTimes(1);
    expect(updateTransactionByIdService.execute).toHaveBeenCalledWith({
      ...req.body,
      id: req.params.id,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(output);
  });

  it('should delete transaction by id with status 204 when service succeeds', async () => {
    // ARRANGE
    const req = {
      params: {
        id: '1',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    const output = {};

    // ACT
    (deleteTransactionByIdService.execute as jest.Mock).mockResolvedValue(
      output,
    );
    await transactionController.delete(req, res);

    // ASSERT
    expect(deleteTransactionByIdService.execute).toHaveBeenCalledTimes(1);
    expect(deleteTransactionByIdService.execute).toHaveBeenCalledWith(
      req.params,
    );
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
