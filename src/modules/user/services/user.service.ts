import { UserRepository } from '../repositories/user.repository';
import { FindUserDTO } from '../dtos/find-user.dto';

export class UserService {
  public constructor(private userRepository: UserRepository) {}

  public async find(): Promise<FindUserDTO[] | null> {
    const users = await this.userRepository.find();
    return users;
  }
}
