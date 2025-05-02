import { FindCategoriesService } from '../services/findCategories.service';
import { CreateCategoryService } from '../services/createCategory.service';
import { UpdateCategoryByIdService } from '../services/updateCategoryById.service';
import { DeleteCategoryByIdService } from '../services/deleteCategoryById.service';

import { CategoryController } from '../controllers/category.controller';
import { PrismaCategoryRepository } from '../repositories/category.repository';

export function makeCategoryController() {
  const categoryRepository = new PrismaCategoryRepository();

  const findCategoriesService = new FindCategoriesService(categoryRepository);
  const createCategoryService = new CreateCategoryService(categoryRepository);
  const updateCategoryByIdService = new UpdateCategoryByIdService(
    categoryRepository,
  );
  const deleteCategoryByIdService = new DeleteCategoryByIdService(
    categoryRepository,
  );

  const categoryController = new CategoryController(
    findCategoriesService,
    createCategoryService,
    updateCategoryByIdService,
    deleteCategoryByIdService,
  );

  return categoryController;
}
