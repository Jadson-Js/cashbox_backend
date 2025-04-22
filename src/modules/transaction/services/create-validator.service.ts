import { UserRepository } from '../../user/repositories/user.repository';

export class CreateValidatorService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async userExists(user_id: string): Promise<boolean> {
    const user = await this.userRepository.findById({ id: user_id });

    return user !== null;
  }
}
