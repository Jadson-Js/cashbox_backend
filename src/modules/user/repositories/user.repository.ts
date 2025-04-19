import { prisma } from '../../../shared/prisma/client';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import { FindUserOutput } from '../dtos/find-user.dto';

export interface UserRepository {
  create(params: CreateUserInput): Promise<CreateUserOutput>;
  find(): Promise<FindUserOutput[] | null>;
}

export class PrismaUserRepository implements UserRepository {
  public async find(): Promise<FindUserOutput[] | null> {
    return prisma.user.findMany({
      select: { id: true, email: true, created_at: true, updated_at: true },
    });
  }

  public async create(params: CreateUserInput): Promise<CreateUserOutput> {
    const { email, password } = params;
    const user = await prisma.user.create({ data: { email, password } });

    return { id: user.id, email: user.email };
  }
}
