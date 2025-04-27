// import { FindCategoryService } from '../services/find-category.service';
import { CreateCategoryService } from '../services/create-category.service';
// import { LoginCategoryService } from '../services/login-category.service';
// import { DeleteCategoryService } from '../services/delete-category.service';

import { CategoryController } from '../controllers/category.controller';
import { PrismaCategoryRepository } from '../repositories/category.repository';

export function makeCategoryController() {
  const categoryRepository = new PrismaCategoryRepository();

  // const findCategoryService = new FindCategoryService(categoryRepository);
  const createCategoryService = new CreateCategoryService(categoryRepository);
  // const loginCategoryService = new LoginCategoryService(categoryRepository);
  // const deleteCategoryService = new DeleteCategoryService(categoryRepository);

  const categoryController = new CategoryController(
    // findCategoryService,
    createCategoryService,
    // loginCategoryService,
    // deleteCategoryService,
  );

  return categoryController;
}
