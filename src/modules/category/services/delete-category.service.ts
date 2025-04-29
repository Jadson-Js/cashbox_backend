import { Result, Err, Ok } from 'ts-results';

import { CategoryRepository } from '../repositories/category.repository';
import { DeleteCategoryInput } from '../dtos/delete-category.dto';

import { AppError } from '../../../shared/utils/error';

export class DeleteCategoryService {
  public constructor(private categoryRepository: CategoryRepository) {}

  public async execute(
    id: DeleteCategoryInput,
  ): Promise<Result<void, AppError>> {
    const category = await this.categoryRepository.delete(id);

    if (category.err) {
      return Err(category.val);
    }

    return category;
  }
}
