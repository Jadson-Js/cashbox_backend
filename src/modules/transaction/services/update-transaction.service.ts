import { CategoryRepository } from '../repositories/transaction.repository';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from '../dtos/update-transaction.dto';

export class UpdateCategoryService {
  public constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    params: UpdateCategoryInput,
  ): Promise<UpdateCategoryOutput> {
    const category = await this.categoryRepository.update(params);

    return category;
  }
}
