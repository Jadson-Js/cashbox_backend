// IMPORT SERVICES
import { FindCategoryService } from '../services/findCategories.service';
import { CreateCategoryService } from '../services/createCategory.service';
import { UpdateCategoryService } from '../services/updateCategoryById.service';
import { DeleteCategoryService } from '../services/deleteCategoryById.service';

// IMPORT REPOSITORIES
import { CategoryRepository } from '../repositories/category.repository';

// IMPORT DTOS
import { FindCategoryOutput } from '../dtos/findCategory.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '../dtos/createCategory.dto';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from '../dtos/updateCategoryById.dto';
import { DeleteCategoryInput } from '../dtos/deleteCategoryById.dto';

// IMPOT UTILS

// MOCKS
jest.mock('../repositories/category.repository');

describe('Category Services', () => {
  // SETUP
  let findCategoryService: FindCategoryService;
  let createCategoryService: CreateCategoryService;
  let updateCategoryService: UpdateCategoryService;
  let deleteCategoryService: DeleteCategoryService;

  let categoryRepository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    categoryRepository = {
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<CategoryRepository>;

    findCategoryService = new FindCategoryService(categoryRepository);
    createCategoryService = new CreateCategoryService(categoryRepository);
    updateCategoryService = new UpdateCategoryService(categoryRepository);
    deleteCategoryService = new DeleteCategoryService(categoryRepository);
  });

  it('should return all categories', async () => {
    // ARRANGE
    const categories: FindCategoryOutput[] = [
      {
        id: '1',
        icon_svg: 'svg',
        title: 'titulo',
        color: 'color',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2',
        icon_svg: 'svg',
        title: 'titulo',
        color: 'color',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // ACT
    categoryRepository.find = jest.fn().mockResolvedValue(categories);
    const result = await findCategoryService.execute();

    // ASSERT
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(result).toEqual(categories);
    expect(categoryRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should create a category', async () => {
    // ARRANGE
    const input: CreateCategoryInput = {
      icon_svg: 'svg',
      title: 'title',
      color: 'color',
    };

    const output: CreateCategoryOutput = {
      id: '1',
      icon_svg: 'svg',
      title: 'title',
      color: 'color',
      created_at: new Date(),
      updated_at: new Date(),
    };

    // ACT
    categoryRepository.create = jest.fn().mockResolvedValue(output);
    const result = await createCategoryService.execute(input);

    // ASSERT
    expect(result).toEqual(output);
    expect(categoryRepository.create).toHaveBeenCalledTimes(1);
    expect(categoryRepository.create).toHaveBeenCalledWith(input);
  });

  it('should update a category', async () => {
    // ARRANGE
    const input: UpdateCategoryInput = {
      id: '1',
      icon_svg: 'svg',
      title: 'title',
      color: 'red',
    };

    const output: UpdateCategoryOutput = {
      id: '1',
      icon_svg: 'svg',
      title: 'title',
      color: 'red',
      created_at: new Date(),
      updated_at: new Date(),
    };

    // ACT
    categoryRepository.update = jest.fn().mockResolvedValue(output);
    const result = await updateCategoryService.execute(input);

    // ASSERT
    expect(result).toEqual(output);
    expect(categoryRepository.update).toHaveBeenCalledTimes(1);
    expect(categoryRepository.update).toHaveBeenCalledWith(input);
  });

  it('should delete all categories', async () => {
    // ARRANGE
    const input: DeleteCategoryInput = {
      id: '1',
    };

    // ACT
    categoryRepository.delete = jest.fn().mockResolvedValue(null);
    const result = await deleteCategoryService.execute(input);

    // ASSERT
    expect(result).toBeUndefined();
    expect(categoryRepository.delete).toHaveBeenCalledTimes(1);
  });
});
