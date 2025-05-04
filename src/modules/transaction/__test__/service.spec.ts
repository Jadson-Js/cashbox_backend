import { Result, Err, Ok } from 'ts-results';
import { Decimal } from '@prisma/client/runtime/library';

// IMPORT SERVICES
import { FindTransactionsByUserIdService } from '../services/findTransactionByUserId.service';
import { CreateTransactionService } from '../services/createTransaction.service';
import { UpdateTransactionByIdService } from '../services/updateTransactionById.service';
import { DeleteTransactionByIdService } from '../services/deleteTransactionById.service';

// IMPORT REPOSITORIES
import { TransactionRepository } from '../repositories/transaction.repository';

// IMPORT DTOS
import {
  FindTransactionByIdInput,
  FindTransactionByIdOutput,
} from '../dtos/findTransactionById.dto';
import {
  FindTransactionsByUserIdInput,
  FindTransactionsByUserIdOutput,
} from '../dtos/findTransactionsByUserId.dto';
import {
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../dtos/createTransaction.dto';
import {
  UpdateTransactionByIdInput,
  UpdateTransactionByIdOutput,
} from '../dtos/updateTransactionById.dto';
import { DeleteTransactionByIdInput } from '../dtos/deleteTransactionById.dto';

import { TransactionType } from '../models/transaction.model';

describe('Transaction Services', () => {
  // SETUP
  let findTransactionService: FindTransactionsByUserIdService;
  let createTransactionService: CreateTransactionService;
  let updateTransactionService: UpdateTransactionByIdService;
  let deleteTransactionService: DeleteTransactionByIdService;

  let transactionRepository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    transactionRepository = {
      findById: jest.fn(),
      findByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<TransactionRepository>;

    findTransactionService = new FindTransactionsByUserIdService(
      transactionRepository,
    );
    createTransactionService = new CreateTransactionService(
      transactionRepository,
    );
    updateTransactionService = new UpdateTransactionByIdService(
      transactionRepository,
    );
    deleteTransactionService = new DeleteTransactionByIdService(
      transactionRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find transaction by user id', async () => {
    // ARRANGE
    const input: FindTransactionsByUserIdInput = {
      user_id: '1',
    };

    const output: FindTransactionsByUserIdOutput[] = [
      {
        id: '1',
        amount: new Decimal(100.0),
        type: TransactionType.INCOME,
        description: 'DESCRIPTION',
        transaction_date: new Date('2021-01-01T01:01:01.000A'),
        created_at: new Date('2021-01-01T01:01:01.000A'),
        updated_at: new Date('2021-01-01T01:01:01.000A'),
        user_id: '1',
        category_id: '1',
      },
    ];

    // ACT
    transactionRepository.findByUserId = jest
      .fn()
      .mockResolvedValue(Ok(output));
    const result = await findTransactionService.execute(input);

    // ASSERT
    expect(result.ok).toBe(true);
    expect(result.val).toEqual(output);
    expect(transactionRepository.findByUserId).toHaveBeenCalledTimes(1);
    expect(transactionRepository.findByUserId).toHaveBeenCalledWith(input);
  });

  it('should create transaction', async () => {
    // ARRANGE
    const input: CreateTransactionInput = {
      amount: new Decimal(100.0),
      type: TransactionType.INCOME,
      description: 'DESCRIPTION',
      transaction_date: new Date('2021-01-01T01:01:01.000A'),
      category_id: '1',
      user_id: '1',
    };

    const output: CreateTransactionOutput = {
      id: '1',
      amount: new Decimal(100.0),
      type: TransactionType.INCOME,
      description: 'DESCRIPTION',
      transaction_date: new Date('2021-01-01T01:01:01.000A'),
      created_at: new Date('2021-01-01T01:01:01.000A'),
      updated_at: new Date('2021-01-01T01:01:01.000A'),
      user_id: '1',
      category_id: '1',
    };

    // ACT
    transactionRepository.create = jest.fn().mockResolvedValue(Ok(output));
    const result = await createTransactionService.execute(input);

    // ASSERT
    expect(result.ok).toBe(true);
    expect(result.val).toEqual(output);
    expect(transactionRepository.create).toHaveBeenCalledTimes(1);
    expect(transactionRepository.create).toHaveBeenCalledWith(input);
  });

  it('should update a transaction by id', async () => {
    // ARRANGE
    const input: UpdateTransactionByIdInput = {
      id: '1',
      amount: new Decimal(100.0),
      type: TransactionType.INCOME,
      description: 'DESCRIPTION',
      transaction_date: new Date('2021-01-01T01:01:01.000A'),
      category_id: '1',
      user_id: '1',
    };

    const output: UpdateTransactionByIdOutput = {
      id: '1',
      amount: new Decimal(100.0),
      type: TransactionType.INCOME,
      description: 'DESCRIPTION',
      transaction_date: new Date('2021-01-01T01:01:01.000A'),
      created_at: new Date('2021-01-01T01:01:01.000A'),
      updated_at: new Date('2021-01-01T01:01:01.000A'),
      user_id: '1',
      category_id: '1',
    };

    // ACT
    transactionRepository.update = jest.fn().mockResolvedValue(Ok(output));
    const result = await updateTransactionService.execute(input);

    // ASSERT
    expect(result.ok).toBe(true);
    expect(result.val).toEqual(output);
    expect(transactionRepository.update).toHaveBeenCalledTimes(1);
    expect(transactionRepository.update).toHaveBeenCalledWith(input);
  });

  it('should delete transaction by id', async () => {
    // ARRANGE
    const input: DeleteTransactionByIdInput = {
      id: '1',
      user_id: '1',
    };

    // ACT
    transactionRepository.delete = jest.fn().mockResolvedValue(Ok(undefined));
    const result = await deleteTransactionService.execute(input);

    // ASSERT
    expect(result.val).toBeUndefined();
    expect(transactionRepository.delete).toHaveBeenCalledTimes(1);
  });
});
