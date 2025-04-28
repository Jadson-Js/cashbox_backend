import { CategoryRepository } from '../repositories/transaction.repository';
import { FindCategoryOutput } from '../dtos/findByUserId-transaction.dto';

export class FindCategoryService {
  public constructor(private categoryRepository: CategoryRepository) {}

  public async execute(): Promise<FindCategoryOutput[] | null> {
    const categories = await this.categoryRepository.find();
    return categories;
  }
}
