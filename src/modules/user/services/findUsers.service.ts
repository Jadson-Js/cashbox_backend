import { Result, Err, Ok } from 'ts-results';

import { UserRepository } from '../repositories/user.repository';

import { FindUsersOutput } from '../dtos/findUsers.dto';

import { AppError } from '../../../shared/utils/error';

export class FindUsersService {
  public constructor(private userRepository: UserRepository) {}

  public async execute(): Promise<Result<FindUsersOutput[] | null, AppError>> {
    const users = await this.userRepository.find();

    if (users.err) {
      return Err(users.val);
    }

    return users;
  }
}
