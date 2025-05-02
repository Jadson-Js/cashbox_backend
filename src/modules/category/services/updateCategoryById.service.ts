import { Result, Err, Ok } from 'ts-results';

import { CategoryRepository } from '../repositories/category.repository';
import {
  UpdateCategoryByIdInput,
  UpdateCategoryByIdOutput,
} from '../dtos/updateCategoryById.dto';
import { AppError } from '../../../shared/utils/error';

export class UpdateCategoryByIdService {
  public constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    params: UpdateCategoryByIdInput,
  ): Promise<Result<UpdateCategoryByIdOutput, AppError>> {
    const category = await this.categoryRepository.update(params);

    if (category.err) {
      return Err(category.val);
    }

    return category;
  }
}
