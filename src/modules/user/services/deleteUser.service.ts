import { Result, Err, Ok } from 'ts-results';

import { UserRepository } from '../repositories/user.repository';

import { AppError } from '../../../shared/utils/error';

export class DeleteUserService {
  public constructor(private userRepository: UserRepository) {}

  public async execute(): Promise<Result<void, AppError>> {
    const result = await this.userRepository.delete();

    if (result.err) {
      return Err(result.val);
    }

    return result;
  }
}
