// IMPORT SERVICES
import { FindUserService } from '../services/find-user.service';
import { SignupUserService } from '../services/create-category.service';
import { LoginUserService } from '../services/login-user.service';
import { DeleteUserService } from '../services/delete-user.service';

// IMPORT REPOSITORIES
import { UserRepository } from '../repositories/category.repository';

// IMPORT DTOS
import { FindUserOutput } from '../dtos/find-user.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-category.dto';
import { LoginUserInput, LoginUserOutput } from '../dtos/login-user.dto';
import {
  FindByEmailUserInput,
  FindByEmailUserOutput,
} from '../dtos/findByEmail-user.dto';

// IMPOT UTILS
import { hashPassword, comparePassword } from '../../../shared/utils/bcrypt';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../shared/utils/jwt';

// MOCKS
jest.mock('../repositories/user.repository');
jest.mock('../../../shared/utils/bcrypt', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password_123'),
  comparePassword: jest.fn().mockResolvedValue(true),
}));
jest.mock('../../../shared/utils/jwt', () => ({
  generateAccessToken: jest.fn().mockReturnValue('access_token_123'),
  generateRefreshToken: jest.fn().mockReturnValue('refresh_token_123'),
}));
jest.mock('bcryptjs', () => ({
  comparePassword: jest.fn(),
}));

describe('User Services', () => {
  // SETUP
  let findUserService: FindUserService;
  let signupUserService: SignupUserService;
  let loginUserService: LoginUserService;
  let deleteUserService: DeleteUserService;

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
    loginUserService = new LoginUserService(userRepository);
    deleteUserService = new DeleteUserService(userRepository);
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

    const inputFormated: CreateUserInput = {
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
    expect(userRepository.create).toHaveBeenCalledWith(inputFormated);
    expect(hashPassword).toHaveBeenCalledTimes(1);
    expect(hashPassword).toHaveBeenCalledWith(input.password);
  });

  it('should login a user', async () => {
    // ARRANGE
    const input: LoginUserInput = {
      email: 'test@test.com',
      password: 'test',
    };
    const output: LoginUserOutput = {
      id: '1',
      email: 'test@test.com',
      accessToken: 'access_token_123',
      refreshToken: 'refresh_token_123',
    };

    const inputFindByEmail: FindByEmailUserInput = {
      email: 'test@test.com',
    };
    const outputFindByEmail: FindByEmailUserOutput = {
      id: '1',
      email: 'test@test.com',
      password: 'hashed_password_123',
      created_at: new Date(),
      updated_at: new Date(),
    };

    // ACT
    userRepository.findByEmail = jest.fn().mockResolvedValue(outputFindByEmail);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (generateAccessToken as jest.Mock).mockReturnValue('access_token_123');
    (generateRefreshToken as jest.Mock).mockReturnValue('refresh_token_123');
    const result = await loginUserService.execute(input);

    // ASSERT
    console.log(result);
    expect(result.value).toEqual(output);
    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(inputFindByEmail);
    expect(comparePassword).toHaveBeenCalledTimes(1);
    expect(comparePassword).toHaveBeenCalledWith({
      password: input.password,
      hashedPassword: outputFindByEmail.password,
    });
    expect(generateAccessToken).toHaveBeenCalledTimes(1);
    expect(generateAccessToken).toHaveBeenCalledWith(outputFindByEmail.id);
    expect(generateRefreshToken).toHaveBeenCalledTimes(1);
    expect(generateRefreshToken).toHaveBeenCalledWith(outputFindByEmail.id);
  });

  it('should delete all users', async () => {
    // ARRANGE
    // ACT
    userRepository.delete = jest.fn().mockResolvedValue(null);
    const result = await deleteUserService.execute();
    // ASSERT
    expect(result).toBeUndefined();
    expect(userRepository.delete).toHaveBeenCalledTimes(1);
  });
});
