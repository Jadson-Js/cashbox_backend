// IMPORT DEPENDENCIES
import { Request, Response } from 'express';

// IMPORT CONTROLLER
import { CategoryController } from '../controllers/category.controller';

// IMPORT SERVICESW
import { FindCategoriesService } from '../services/findCategories.service';
import { CreateCategoryService } from '../services/createCategory.service';
import { UpdateCategoryByIdService } from '../services/updateCategoryById.service';
import { DeleteCategoryByIdService } from '../services/deleteCategoryById.service';

describe('CategoryController', () => {
  // DECLARE TYPES
  let categoryController: CategoryController;

  let findCategoriesService: FindCategoriesService;
  let createCategoryService: CreateCategoryService;
  let updateCategoryByIdService: UpdateCategoryByIdService;
  let deleteCategoryByIdService: DeleteCategoryByIdService;

  beforeEach(() => {
    // DECLARE METHODS OF SERVICES HOW MOCK
    findCategoriesService = {
      execute: jest.fn(),
    } as unknown as FindCategoriesService;
    createCategoryService = {
      execute: jest.fn(),
    } as unknown as CreateCategoryService;
    updateCategoryByIdService = {
      execute: jest.fn(),
    } as unknown as UpdateCategoryByIdService;
    deleteCategoryByIdService = {
      execute: jest.fn(),
    } as unknown as DeleteCategoryByIdService;

    categoryController = new CategoryController(
      findCategoriesService,
      createCategoryService,
      updateCategoryByIdService,
      deleteCategoryByIdService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all categories with status 200 when service succeeds', async () => {
    // ARRANGE
    const req = {} as Request;

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
          icon_svg: 'Chapeu',
          title: 'Agiota',
          color: 'VERDE',
          created_at: '2025-01-01T01:01:01.000A',
          updated_at: '2025-01-01T01:01:01.000A',
        },
      ],
    };

    // ACT
    (findCategoriesService.execute as jest.Mock).mockResolvedValue(output);
    await categoryController.find(req, res);

    // ASSERT
    expect(findCategoriesService.execute).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(output);
  });

  it('should create category with status 201 when service succeeds', async () => {
    // ARRANGE
    const req = {
      body: {
        icon_svg: 'SVG',
        title: 'TITLE',
        color: 'COLOR',
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
        icon_svg: 'SVG',
        title: 'TITLE',
        color: 'COLOR',
        created_at: '2025-01-01T01:01:01.000A',
        updated_at: '2025-01-01T01:01:01.000A',
      },
    };

    // ACT
    (createCategoryService.execute as jest.Mock).mockResolvedValue(output);
    await categoryController.create(req, res);

    // ASSERT
    expect(createCategoryService.execute).toHaveBeenCalledTimes(1);
    expect(createCategoryService.execute).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(output);
  });

  it('should update category with status 200 when service succeeds', async () => {
    // ARRANGE
    const req = {
      params: {
        id: '1',
      },
      body: {
        icon_svg: 'SVG_EDITED',
        title: 'TITLE_EDITED',
        color: 'COLOR_EDITED',
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
        icon_svg: 'SVG_EDITED',
        title: 'TITLE_EDITED',
        color: 'COLOR_EDITED',
        created_at: '2025-01-01T01:01:01.000A',
        updated_at: '2025-01-01T01:01:01.000A',
      },
    };

    // ACT
    (updateCategoryByIdService.execute as jest.Mock).mockResolvedValue(output);
    await categoryController.update(req, res);

    // ASSERT
    expect(updateCategoryByIdService.execute).toHaveBeenCalledTimes(1);
    expect(updateCategoryByIdService.execute).toHaveBeenCalledWith({
      ...req.body,
      id: req.params.id,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(output);
  });

  it('should delete category by id with status 204 when service succeeds', async () => {
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
    (deleteCategoryByIdService.execute as jest.Mock).mockResolvedValue(output);
    await categoryController.delete(req, res);

    // ASSERT
    expect(deleteCategoryByIdService.execute).toHaveBeenCalledTimes(1);
    expect(deleteCategoryByIdService.execute).toHaveBeenCalledWith(req.params);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
