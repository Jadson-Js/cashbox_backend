import { Result, Err, Ok } from 'ts-results';

import { CategoryRepository } from '../repositories/category.repository';
import { FindCategoryOutput } from '../dtos/findCategory.dto';

import { AppError } from '../../../shared/utils/error';

export class FindCategoriesService {
  public constructor(private categoryRepository: CategoryRepository) {}

  public async execute(): Promise<
    Result<FindCategoryOutput[] | null, AppError>
  > {
    const categories = await this.categoryRepository.find();

    if (categories.err) {
      return Err(categories.val);
    }

    return categories;
  }
}
