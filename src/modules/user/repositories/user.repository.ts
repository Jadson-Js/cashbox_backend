import { prisma } from '../../../shared/prisma/client';

import { FindUserOutput } from '../dtos/find-user.dto';
import {
  FindByEmailUserInput,
  FindByEmailUserOutput,
} from '../dtos/findByEmail-user.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';

export interface UserRepository {
  find(): Promise<FindUserOutput[] | null>;
  findByEmail(
    params: FindByEmailUserInput,
  ): Promise<FindByEmailUserOutput | null>;
  create(params: CreateUserInput): Promise<CreateUserOutput>;
  delete(): Promise<void>;
}

export class PrismaUserRepository implements UserRepository {
  public async find(): Promise<FindUserOutput[] | null> {
    const select = {
      id: true,
      email: true,
      created_at: true,
      updated_at: true,
    };

    return prisma.user.findMany({
      select,
    });
  }

  public async findByEmail(
    params: FindByEmailUserInput,
  ): Promise<FindByEmailUserOutput | null> {
    const select = {
      id: true,
      email: true,
      password: true,
      created_at: true,
      updated_at: true,
    };

    return prisma.user.findFirst({
      where: { email: params.email },
      select,
    });
  }

  public async create(params: CreateUserInput): Promise<CreateUserOutput> {
    const user = await prisma.user.create({ data: params });

    return { id: user.id, email: user.email };
  }

  public async delete(): Promise<void> {
    await prisma.user.deleteMany();
  }
}
