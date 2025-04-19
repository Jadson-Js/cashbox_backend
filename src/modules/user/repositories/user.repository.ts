import { prisma } from '../../../shared/prisma/client';
import { FindUserDTO } from '../dtos/find-user.dto';
//import { User } from '../models/user.model';

export interface UserRepository {
  find(): Promise<FindUserDTO[] | null>;
}

export class PrismaUserRepository implements UserRepository {
  public async find(): Promise<FindUserDTO[] | null> {
    return prisma.user.findMany();
  }
}
