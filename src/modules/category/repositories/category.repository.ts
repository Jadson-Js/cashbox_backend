import { prisma } from '../../../shared/prisma/client';
import { FindCategoryOutput } from '../dtos/find-category.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '../dtos/create-category.dto';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from '../dtos/update-category.dto';
import { DeleteCategoryInput } from '../dtos/delete-category.dto';

export interface CategoryRepository {
  find(): Promise<FindCategoryOutput[] | null>;
  create(params: CreateCategoryInput): Promise<CreateCategoryOutput>;
  update(params: UpdateCategoryInput): Promise<UpdateCategoryOutput>;
  delete(params: DeleteCategoryInput): Promise<void>;
}

export class PrismaCategoryRepository implements CategoryRepository {
  public async find(): Promise<FindCategoryOutput[] | null> {
    const select = {
      id: true,
      icon_svg: true,
      title: true,
      color: true,
    };

    return prisma.category.findMany({
      select,
    });
  }

  public async create(
    params: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    const category = await prisma.category.create({ data: params });

    return { id: category.id };
  }

  public async update(
    params: UpdateCategoryInput,
  ): Promise<UpdateCategoryOutput> {
    const category = await prisma.category.update({
      where: { id: params.id },
      data: params,
    });

    return category;
  }

  public async delete(params: DeleteCategoryInput): Promise<void> {
    await prisma.category.delete({
      where: { id: params.id },
    });
  }
}
