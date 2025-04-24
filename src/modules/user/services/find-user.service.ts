import { UserRepository } from '../repositories/user.repository';
import { FindUserOutput } from '../dtos/find-user.dto';

export class FindUserService {
  public constructor(private userRepository: UserRepository) {}

  public async execute(): Promise<FindUserOutput[] | null> {
    const users = await this.userRepository.find();
    return users;
  }
}
