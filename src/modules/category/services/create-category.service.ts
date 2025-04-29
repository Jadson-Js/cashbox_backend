import { Result, Err, Ok } from 'ts-results';

import { CategoryRepository } from '../repositories/category.repository';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '../dtos/create-category.dto';

import { AppError } from '../../../shared/utils/error';

export class CreateCategoryService {
  public constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    params: CreateCategoryInput,
  ): Promise<Result<CreateCategoryOutput, AppError>> {
    const category = await this.categoryRepository.create(params);

    if (category.err) {
      return Err(category.val);
    }

    return category;
  }
}
