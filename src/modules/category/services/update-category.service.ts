import { Result, Err, Ok } from 'ts-results';

import { CategoryRepository } from '../repositories/category.repository';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from '../dtos/update-category.dto';
import { AppError } from '../../../shared/utils/error';

export class UpdateCategoryService {
  public constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    params: UpdateCategoryInput,
  ): Promise<Result<UpdateCategoryOutput, AppError>> {
    const category = await this.categoryRepository.update(params);

    if (category.err) {
      return Err(category.val);
    }

    return category;
  }
}
