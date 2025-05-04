// IMPORT DEPENDENCIES
import { Result, Err, Ok } from 'ts-results';
import { prisma } from '../../../shared/prisma/client';

// IMPORT REPOSITORY
import {
  PrismaUserRepository,
  UserRepository,
} from '../repositories/user.repository';

// IMPORT DTOs
import { FindUsersOutput } from '../dtos/findUsers.dto';
import {
  FindUserByEmailInput,
  FindUserByEmailOutput,
} from '../dtos/findUserByEmail.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/createUser.dto';
import { password } from '../../../shared/middlewares/zod/user.schema';

// Mock
jest.mock('../../../shared/prisma/client', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

describe('UserPrismaRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new PrismaUserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('UserPrismaRepository', () => {
    it('should find all users when successful', async () => {
      // Arrange
      const output: FindUsersOutput[] = [
        {
          id: '1',
          email: 'test1@example.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '2',
          email: 'test2@example.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const select = {
        id: true,
        email: true,
        created_at: true,
        updated_at: true,
      };

      // Act
      (prisma.user.findMany as jest.Mock).mockResolvedValue(output);
      const result = await repository.find();

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        select,
      });
    });

    it('should find user by email when successful', async () => {
      // Arrange
      const input: FindUserByEmailInput = {
        email: 'test1@example.com',
      };

      const output: FindUserByEmailOutput = {
        id: '1',
        email: 'test1@example.com',
        password: 'hashed_password_123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const select = {
        id: true,
        email: true,
        password: true,
        created_at: true,
        updated_at: true,
      };

      const where = {
        email: input.email,
      };

      // Act
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(output);
      const result = await repository.findByEmail(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where,
        select,
      });
    });

    it('should create  user when successful', async () => {
      // Arrange
      const input: CreateUserInput = {
        email: 'test1@example.com',
        password: 'test',
      };

      const output: CreateUserOutput = {
        id: '1',
        email: 'test1@example.com',
        password: 'hashed_password_123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Act
      (prisma.user.create as jest.Mock).mockResolvedValue(output);
      const result = await repository.create(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: input });
    });

    it('should delete all users when successful', async () => {
      // Arrange
      // Act
      (prisma.user.deleteMany as jest.Mock).mockResolvedValue(undefined);
      const result = await repository.delete();

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toBeUndefined();
      expect(prisma.user.deleteMany).toHaveBeenCalledWith();
    });
  });
});
