import { Result, Err, Ok } from 'ts-results';

import { prisma } from '../../../shared/prisma/client';

import { FindCategoryOutput } from '../dtos/findCategory.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '../dtos/createCategory.dto';
import {
  UpdateCategoryByIdInput,
  UpdateCategoryByIdOutput,
} from '../dtos/updateCategoryById.dto';
import { DeleteCategoryByIdInput } from '../dtos/deleteCategoryById.dto';

import { AppError, InternalServerError } from '../../../shared/utils/error';

export interface CategoryRepository {
  find(): Promise<Result<FindCategoryOutput[] | null, AppError>>;
  create(
    params: CreateCategoryInput,
  ): Promise<Result<CreateCategoryOutput, AppError>>;
  update(
    params: UpdateCategoryByIdInput,
  ): Promise<Result<UpdateCategoryByIdOutput, AppError>>;
  delete(params: DeleteCategoryByIdInput): Promise<Result<void, AppError>>;
}

export class PrismaCategoryRepository implements CategoryRepository {
  public async find(): Promise<Result<FindCategoryOutput[] | null, AppError>> {
    const select = {
      id: true,
      icon_name: true,
      title: true,
      icon_color: true,
      created_at: true,
      updated_at: true,
    };
    try {
      const categories = await prisma.category.findMany({
        select,
      });

      return Ok(categories);
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async create(
    params: CreateCategoryInput,
  ): Promise<Result<CreateCategoryOutput, AppError>> {
    const input = {
      icon_name: params.icon_name,
      title: params.title,
      icon_color: params.icon_color,
    };

    try {
      const category = await prisma.category.create({ data: input });

      return Ok(category);
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async update(
    params: UpdateCategoryByIdInput,
  ): Promise<Result<UpdateCategoryByIdOutput, AppError>> {
    const input = {
      icon_name: params.icon_name,
      title: params.title,
      icon_color: params.icon_color,
    };
    try {
      const category = await prisma.category.update({
        where: { id: params.id },
        data: input,
      });

      return Ok(category);
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async delete(
    params: DeleteCategoryByIdInput,
  ): Promise<Result<void, AppError>> {
    try {
      await prisma.category.delete({
        where: { id: params.id },
      });

      return Ok(undefined);
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }
}
