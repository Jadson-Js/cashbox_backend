import { UserRepository } from '../repositories/category.repository';

export class DeleteUserService {
  public constructor(private userRepository: UserRepository) {}

  public async execute(): Promise<void> {
    await this.userRepository.delete();
  }
}
