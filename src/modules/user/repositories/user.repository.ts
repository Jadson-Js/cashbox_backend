import { Result, Err, Ok } from 'ts-results';

import { prisma } from '../../../shared/prisma/client';

import { FindUsersOutput } from '../dtos/findUsers.dto';
import {
  FindUserByEmailInput,
  FindUserByEmailOutput,
} from '../dtos/findUserByEmail.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/createUser.dto';

import { AppError, InternalServerError } from '../../../shared/utils/error';

export interface UserRepository {
  find(): Promise<Result<FindUsersOutput[] | null, AppError>>;
  findByEmail(
    params: FindUserByEmailInput,
  ): Promise<Result<FindUserByEmailOutput | null, AppError>>;
  create(params: CreateUserInput): Promise<Result<CreateUserOutput, AppError>>;
  delete(): Promise<Result<void, AppError>>;
}

export class PrismaUserRepository implements UserRepository {
  public async find(): Promise<Result<FindUsersOutput[] | null, AppError>> {
    const select = {
      id: true,
      email: true,
      created_at: true,
      updated_at: true,
    };

    try {
      const users = await prisma.user.findMany({
        select,
      });
      return Ok(users);
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async findByEmail(
    params: FindUserByEmailInput,
  ): Promise<Result<FindUserByEmailOutput | null, AppError>> {
    const select = {
      id: true,
      email: true,
      password: true,
      created_at: true,
      updated_at: true,
    };
    try {
      const user = await prisma.user.findFirst({
        where: { email: params.email },
        select,
      });

      if (!user) {
        return Ok(null);
      }

      return Ok({
        id: user.id,
        email: user.email,
        password: user.password,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async create(
    params: CreateUserInput,
  ): Promise<Result<CreateUserOutput, AppError>> {
    const input = {
      email: params.email,
      password: params.password,
    };

    try {
      const user = await prisma.user.create({ data: input });

      return Ok({
        id: user.id,
        email: user.email,
        password: user.password,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async delete(): Promise<Result<void, AppError>> {
    try {
      await prisma.user.deleteMany();

      return Ok(undefined);
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }
}
