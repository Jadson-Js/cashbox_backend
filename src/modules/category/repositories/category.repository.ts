import { prisma } from '../../../shared/prisma/client';
import { FindCategoryOutput } from '../dtos/find-category.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '../dtos/create-category.dto';
import { icon_svg } from '../../../shared/middlewares/schemas-zod';
/* import {
  FindByEmailCategoryInput,
  FindByEmailCategoryOutput,
} from '../dtos/findByEmail-category.dto'; */

export interface CategoryRepository {
  find(): Promise<FindCategoryOutput[] | null>;
  /* findByEmail(
    params: FindByEmailCategoryInput,
  ): Promise<FindByEmailCategoryOutput | null>; */
  create(params: CreateCategoryInput): Promise<CreateCategoryOutput>;
  /* delete(): Promise<void>; */
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

  /* public async findByEmail(
    params: FindByEmailCategoryInput,
  ): Promise<FindByEmailCategoryOutput | null> {
    const select = {
      id: true,
      email: true,
      password: true,
      created_at: true,
      updated_at: true,
    };

    return prisma.category.findFirst({
      where: { email: params.email },
      select,
    });
  } */

  public async create(
    params: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    const category = await prisma.category.create({ data: params });

    return { id: category.id };
  }

  /* public async delete(): Promise<void> {
    await prisma.category.deleteMany();
  } */
}
