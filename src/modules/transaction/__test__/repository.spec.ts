// IMPORT DEPENDENCIES
import { prisma } from '../../../shared/prisma/client';

// IMPORT REPOSITORY
import {
  PrismaTransactionRepository,
  TransactionRepository,
} from '../repositories/transaction.repository';

// IMPORT DTOs
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
import { Decimal } from '@prisma/client/runtime/library';
import { TransactionType } from '../models/transaction.model';

// Mock
jest.mock('../../../shared/prisma/client', () => ({
  prisma: {
    transaction: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('TransactionPrismaRepository', () => {
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = new PrismaTransactionRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('TransactionPrismaRepository', () => {
    it('should find transactions by id when successful', async () => {
      // Arrange
      const input: FindTransactionByIdInput = {
        id: '1',
      };

      const output: FindTransactionsByUserIdOutput = {
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

      const select = {
        id: true,
        amount: true,
        type: true,
        description: true,
        transaction_date: true,
        created_at: true,
        updated_at: true,
        user_id: true,
        category_id: true,
      };

      const where = {
        id: input.id,
      };

      // Act
      (prisma.transaction.findUnique as jest.Mock).mockResolvedValue(output);
      const result = await repository.findById(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.transaction.findUnique).toHaveBeenCalledWith({
        where,
        select,
      });
    });

    it('should find transactions by user id when successful', async () => {
      // Arrange
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

      const select = {
        id: true,
        amount: true,
        type: true,
        description: true,
        transaction_date: true,
        created_at: true,
        updated_at: true,
        user_id: true,
        category_id: true,
      };

      const where = {
        user_id: input.user_id,
      };

      // Act
      (prisma.transaction.findMany as jest.Mock).mockResolvedValue(output);
      const result = await repository.findByUserId(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.transaction.findMany).toHaveBeenCalledWith({
        where,
        select,
      });
    });

    it('should create transaction when successful', async () => {
      // Arrange
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

      // Act
      (prisma.transaction.create as jest.Mock).mockResolvedValue(output);
      const result = await repository.create(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.transaction.create).toHaveBeenCalledWith({ data: input });
    });

    it('should update transaction by id when successful', async () => {
      // Arrange
      const input: UpdateTransactionByIdInput = {
        id: '2',
        amount: new Decimal(100.0),
        type: TransactionType.INCOME,
        description: 'DESCRIPTION',
        transaction_date: new Date('2021-01-01T01:01:01.000A'),
        category_id: '1',
        user_id: '1',
      };

      const output: UpdateTransactionByIdOutput = {
        id: '2',
        amount: new Decimal(100.0),
        type: TransactionType.INCOME,
        description: 'DESCRIPTION',
        transaction_date: new Date('2021-01-01T01:01:01.000Z'),
        created_at: new Date('2021-01-01T01:01:01.000A'),
        updated_at: new Date('2021-01-01T01:01:01.000A'),
        user_id: '1',
        category_id: '1',
      };

      const data = {
        amount: input.amount,
        type: input.type,
        description: input.description,
        transaction_date: input.transaction_date,
        category_id: input.category_id,
      };

      const where = {
        id: input.id,
        user_id: input.user_id,
      };

      // Act
      (prisma.transaction.update as jest.Mock).mockResolvedValue(output);
      const result = await repository.update(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.transaction.update).toHaveBeenCalledWith({
        where,
        data,
      });
    });

    it('should delete all transactions when successful', async () => {
      // Arrange
      const input: DeleteTransactionByIdInput = {
        id: '1',
        user_id: '1',
      };

      const where = {
        id: input.id,
        user_id: input.user_id,
      };

      // Act
      (prisma.transaction.delete as jest.Mock).mockResolvedValue(undefined);
      const result = await repository.delete(where);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toBeUndefined();
      expect(prisma.transaction.delete).toHaveBeenCalledWith({ where });
    });
  });
});
