import { CategoryRepository } from '../repositories/category.repository';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '../dtos/create-category.dto';

export class CreateCategoryService {
  public constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    params: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    const category = await this.categoryRepository.create(params);

    return category;
  }
}
