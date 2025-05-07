// IMPORT DEPENDENCIES
import { prisma } from '../../../shared/prisma/client';

// IMPORT REPOSITORY
import {
  PrismaCategoryRepository,
  CategoryRepository,
} from '../repositories/category.repository';

// IMPORT DTOs
import { FindCategoryOutput } from '../dtos/findCategory.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '../dtos/createCategory.dto';
import {
  UpdateCategoryByIdInput,
  UpdateCategoryByIdOutput,
} from '../dtos/updateCategoryById.dto';
import { DeleteCategoryByIdInput } from '../dtos/deleteCategoryById.dto';

// Mock
jest.mock('../../../shared/prisma/client', () => ({
  prisma: {
    category: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('CategoryPrismaRepository', () => {
  let repository: CategoryRepository;

  beforeEach(() => {
    repository = new PrismaCategoryRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('CategoryPrismaRepository', () => {
    it('should find all categories when successful', async () => {
      // Arrange
      const output: FindCategoryOutput[] = [
        {
          id: '1',
          icon_name: 'svg',
          title: 'title',
          icon_color: 'icon_color',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '2',
          icon_name: 'svg',
          title: 'title',
          icon_color: 'icon_color',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const select = {
        id: true,
        icon_name: true,
        title: true,
        icon_color: true,
        created_at: true,
        updated_at: true,
      };

      // Act
      (prisma.category.findMany as jest.Mock).mockResolvedValue(output);
      const result = await repository.find();

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        select,
      });
    });

    it('should create  category when successful', async () => {
      // Arrange
      const input: CreateCategoryInput = {
        icon_name: 'svg',
        title: 'title',
        icon_color: 'icon_color',
      };

      const output: CreateCategoryOutput = {
        id: '2',
        icon_name: 'svg',
        title: 'title',
        icon_color: 'icon_color',
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Act
      (prisma.category.create as jest.Mock).mockResolvedValue(output);
      const result = await repository.create(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.category.create).toHaveBeenCalledWith({ data: input });
    });

    it('should update category by id when successful', async () => {
      // Arrange
      const input: UpdateCategoryByIdInput = {
        id: '1',
        icon_name: 'svg',
        title: 'title',
        icon_color: 'icon_color',
      };

      const output: UpdateCategoryByIdOutput = {
        id: '1',
        icon_name: 'svg',
        title: 'title',
        icon_color: 'icon_color',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const data = {
        icon_name: input.icon_name,
        title: input.title,
        icon_color: input.icon_color,
      };

      const where = {
        id: input.id,
      };

      // Act
      (prisma.category.update as jest.Mock).mockResolvedValue(output);
      const result = await repository.update(input);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toEqual(output);
      expect(prisma.category.update).toHaveBeenCalledWith({
        where,
        data,
      });
    });

    it('should delete all categories when successful', async () => {
      // Arrange
      const input: DeleteCategoryByIdInput = {
        id: '1',
      };

      const where = {
        id: input.id,
      };

      // Act
      (prisma.category.delete as jest.Mock).mockResolvedValue(undefined);
      const result = await repository.delete(where);

      // Assert
      expect(result.ok).toBe(true);
      expect(result.val).toBeUndefined();
      expect(prisma.category.delete).toHaveBeenCalledWith({ where });
    });
  });
});
