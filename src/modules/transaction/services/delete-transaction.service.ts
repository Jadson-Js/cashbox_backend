import { CategoryRepository } from '../repositories/transaction.repository';
import { DeleteCategoryInput } from '../dtos/delete-transaction.dto';

export class DeleteCategoryService {
  public constructor(private categoryRepository: CategoryRepository) {}

  public async execute(id: DeleteCategoryInput): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
