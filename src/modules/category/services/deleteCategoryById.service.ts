import { Result, Err, Ok } from 'ts-results';

import { CategoryRepository } from '../repositories/category.repository';

import { DeleteCategoryByIdInput } from '../dtos/deleteCategoryById.dto';

import { AppError } from '../../../shared/utils/error';

export class DeleteCategoryByIdService {
  public constructor(private categoryRepository: CategoryRepository) {}

  public async execute(
    id: DeleteCategoryByIdInput,
  ): Promise<Result<void, AppError>> {
    const category = await this.categoryRepository.delete(id);

    if (category.err) {
      return Err(category.val);
    }

    return category;
  }
}
