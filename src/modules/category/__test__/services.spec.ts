import { Result, Err, Ok } from 'ts-results';

// IMPORT SERVICES
import { FindCategoriesService } from '../services/findCategories.service';
import { CreateCategoryService } from '../services/createCategory.service';
import { UpdateCategoryByIdService } from '../services/updateCategoryById.service';
import { DeleteCategoryByIdService } from '../services/deleteCategoryById.service';

// IMPORT REPOSITORIES
import { CategoryRepository } from '../repositories/category.repository';

// IMPORT DTOS
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

describe('Category Services', () => {
  // SETUP
  let findCategoryService: FindCategoriesService;
  let createCategoryService: CreateCategoryService;
  let updateCategoryService: UpdateCategoryByIdService;
  let deleteCategoryService: DeleteCategoryByIdService;

  let categoryRepository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    categoryRepository = {
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<CategoryRepository>;

    findCategoryService = new FindCategoriesService(categoryRepository);
    createCategoryService = new CreateCategoryService(categoryRepository);
    updateCategoryService = new UpdateCategoryByIdService(categoryRepository);
    deleteCategoryService = new DeleteCategoryByIdService(categoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all categories', async () => {
    // ARRANGE
    const output: FindCategoryOutput[] = [
      {
        id: '1',
        icon_svg: 'svg',
        title: 'titulo',
        color: 'color',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // ACT
    categoryRepository.find = jest.fn().mockResolvedValue(Ok(output));
    const result = await findCategoryService.execute();

    // ASSERT
    expect(result.ok).toBe(true);
    expect(result.val).toEqual(output);
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
    categoryRepository.create = jest.fn().mockResolvedValue(Ok(output));
    const result = await createCategoryService.execute(input);

    // ASSERT
    expect(result.ok).toBe(true);
    expect(result.val).toEqual(output);
    expect(categoryRepository.create).toHaveBeenCalledTimes(1);
    expect(categoryRepository.create).toHaveBeenCalledWith(input);
  });

  it('should update a category', async () => {
    // ARRANGE
    const input: UpdateCategoryByIdInput = {
      id: '1',
      icon_svg: 'svg',
      title: 'title',
      color: 'red',
    };

    const output: UpdateCategoryByIdOutput = {
      id: '1',
      icon_svg: 'svg',
      title: 'title',
      color: 'red',
      created_at: new Date(),
      updated_at: new Date(),
    };

    // ACT
    categoryRepository.update = jest.fn().mockResolvedValue(Ok(output));
    const result = await updateCategoryService.execute(input);

    // ASSERT
    expect(result.ok).toBe(true);
    expect(result.val).toEqual(output);
    expect(categoryRepository.update).toHaveBeenCalledTimes(1);
    expect(categoryRepository.update).toHaveBeenCalledWith(input);
  });

  it('should delete all categories', async () => {
    // ARRANGE
    const input: DeleteCategoryByIdInput = {
      id: '1',
    };

    // ACT
    categoryRepository.delete = jest.fn().mockResolvedValue(Ok(undefined));
    const result = await deleteCategoryService.execute(input);

    // ASSERT
    expect(result.val).toBeUndefined();
    expect(categoryRepository.delete).toHaveBeenCalledTimes(1);
  });
});
