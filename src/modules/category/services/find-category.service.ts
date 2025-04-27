import { CategoryRepository } from '../repositories/category.repository';
import { FindCategoryOutput } from '../dtos/find-category.dto';

export class FindCategoryService {
  public constructor(private categoryRepository: CategoryRepository) {}

  public async execute(): Promise<FindCategoryOutput[] | null> {
    const categories = await this.categoryRepository.find();
    return categories;
  }
}
