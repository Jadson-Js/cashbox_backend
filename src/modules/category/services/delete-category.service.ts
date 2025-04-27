import { CategoryRepository } from '../repositories/category.repository';
import { DeleteCategoryInput } from '../dtos/delete-category.dto';

export class DeleteCategoryService {
  public constructor(private categoryRepository: CategoryRepository) {}

  public async execute(id: DeleteCategoryInput): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
