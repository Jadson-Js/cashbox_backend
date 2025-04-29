import { Result, Err, Ok } from 'ts-results';

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

import { AppError, InternalServerError } from '../../../shared/utils/error';

export interface CategoryRepository {
  find(): Promise<Result<FindCategoryOutput[] | null, AppError>>;
  create(
    params: CreateCategoryInput,
  ): Promise<Result<CreateCategoryOutput, AppError>>;
  update(
    params: UpdateCategoryInput,
  ): Promise<Result<UpdateCategoryOutput, AppError>>;
  delete(params: DeleteCategoryInput): Promise<Result<void, AppError>>;
}

export class PrismaCategoryRepository implements CategoryRepository {
  public async find(): Promise<Result<FindCategoryOutput[] | null, AppError>> {
    const select = {
      id: true,
      icon_svg: true,
      title: true,
      color: true,
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
      icon_svg: params.icon_svg,
      title: params.title,
      color: params.color,
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
    params: UpdateCategoryInput,
  ): Promise<Result<UpdateCategoryOutput, AppError>> {
    const input = {
      icon_svg: params.icon_svg,
      title: params.title,
      color: params.color,
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
    params: DeleteCategoryInput,
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
