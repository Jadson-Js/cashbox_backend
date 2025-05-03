import { Result, Err, Ok } from 'ts-results';

// IMPORT SERVICES
import { FindUsersService } from '../services/findUsers.service';
import { SignupUserService } from '../services/signupUser.service';
import { LoginUserService } from '../services/loginUser.service';
import { DeleteUsersService } from '../services/deleteUsers.service';

// IMPORT REPOSITORIES
import { UserRepository } from '../repositories/user.repository';

// IMPORT DTOS
import { FindUsersOutput } from '../dtos/findUsers.dto';
import {
  FindUserByEmailInput,
  FindUserByEmailOutput,
} from '../dtos/findUserByEmail.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/createUser.dto';
import { SignupUserInput, SignupUserOutput } from '../dtos/signupUser.dto';
import { LoginUserInput, LoginUserOutput } from '../dtos/loginUser.dto';

// IMPOT UTILS
import { hashPassword, comparePassword } from '../../../shared/utils/bcrypt';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../shared/utils/jwt';
import { AppError } from '../../../shared/utils/error';

// MOCKS
jest.mock('../../../shared/utils/bcrypt', () => ({
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
}));
jest.mock('../../../shared/utils/jwt', () => ({
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
}));

describe('User Services', () => {
  // SETUP
  let findUsersService: FindUsersService;
  let signupUserService: SignupUserService;
  let loginUserService: LoginUserService;
  let deleteUsersService: DeleteUsersService;

  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      find: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<UserRepository>;

    findUsersService = new FindUsersService(userRepository);
    signupUserService = new SignupUserService(userRepository);
    loginUserService = new LoginUserService(userRepository);
    deleteUsersService = new DeleteUsersService(userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all users when repository succeeds', async () => {
    // ARRANGE
    const output: FindUsersOutput[] = [
      {
        id: '1',
        email: 'test@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // ACT
    userRepository.find = jest.fn().mockResolvedValue(output);
    const result = await findUsersService.execute();

    // ASSERT
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result).toEqual(output);
    expect(userRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should signup user when repository succeeds', async () => {
    // ARRANGE
    const input: SignupUserInput = {
      email: 'test@test.com',
      password: 'test',
    };

    const inputFormated: SignupUserInput = {
      email: 'test@test.com',
      password: 'hashed_password_123',
    };

    const output: SignupUserOutput = {
      id: '1',
      email: 'test@test.com',
    };

    // ACT
    (hashPassword as jest.Mock).mockResolvedValue('hashed_password_123');
    userRepository.create = jest.fn().mockResolvedValue(Ok(output));

    const result = await signupUserService.execute(input);

    // ASSERT
    expect(result.val).toEqual(output);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledWith(inputFormated);
    expect(hashPassword).toHaveBeenCalledTimes(1);
    expect(hashPassword).toHaveBeenCalledWith(input.password);
  });

  it('should login user when repository succeeds', async () => {
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

    const inputFindByEmail: FindUserByEmailInput = {
      email: 'test@test.com',
    };
    const outputFindByEmail: FindUserByEmailOutput = {
      id: '1',
      email: 'test@test.com',
      password: 'hashed_password_123',
      created_at: new Date(),
      updated_at: new Date(),
    };

    // ACT
    userRepository.findByEmail = jest
      .fn()
      .mockResolvedValue(Ok(outputFindByEmail));
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (generateAccessToken as jest.Mock).mockReturnValue('access_token_123');
    (generateRefreshToken as jest.Mock).mockReturnValue('refresh_token_123');

    const result = await loginUserService.execute(input);

    // ASSERT
    expect(result.val).toEqual(output);
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
    userRepository.delete = jest.fn().mockResolvedValue(Ok(undefined));
    const result = await deleteUsersService.execute();
    console.log(result);
    // ASSERT
    expect(result.val).toBeUndefined();
    expect(userRepository.delete).toHaveBeenCalledTimes(1);
  });
});
