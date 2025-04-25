// IMPORT SERVICES
import { FindUserService } from '../services/find-user.service';

// IMPORT REPOSITORIES
import { UserRepository } from '../repositories/user.repository';

// IMPORT DTOS
import { FindUserOutput } from '../dtos/find-user.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import { SignupUserService } from '../services/signup-user.service';

// IMPOT UTILS
import { hashPassword } from '../../../shared/utils/bcrypt';

// MOCK DEPENDENCIES
jest.mock('../repositories/user.repository');
jest.mock('../../../shared/utils/bcrypt', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password_123'),
}));

describe('User Services', () => {
  // SETUP
  let findUserService: FindUserService;
  let signupUserService: SignupUserService;

  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = {
      find: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<UserRepository>;

    findUserService = new FindUserService(userRepository);
    signupUserService = new SignupUserService(userRepository);
  });

  it('should return all users', async () => {
    // ARRANGE
    const users: FindUserOutput[] = [
      {
        id: '1',
        email: 'test@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2',
        email: 'test2@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // ACT
    userRepository.find = jest.fn().mockResolvedValue(users);
    const result = await findUserService.execute();

    // ASSERT
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(result).toEqual(users);
    expect(userRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should create a user', async () => {
    // ARRANGE
    const input: CreateUserInput = {
      email: 'test@test.com',
      password: 'test',
    };

    const inputHashedPassword: CreateUserInput = {
      email: 'test@test.com',
      password: 'hashed_password_123',
    };

    const output: CreateUserOutput = {
      id: '1',
      email: 'test@test.com',
    };

    // ACT
    userRepository.create = jest.fn().mockResolvedValue(output);
    const result = await signupUserService.execute(input);

    // ASSERT
    expect(result).toEqual(output);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledWith(inputHashedPassword);
    expect(hashPassword).toHaveBeenCalledTimes(1);
    expect(hashPassword).toHaveBeenCalledWith(input.password);
  });
});
