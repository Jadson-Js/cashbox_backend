// IMPORT DEPENDENCIES
import { Request, Response } from 'express';

// IMPORT CONTROLLER
import { UserController } from '../controllers/user.controller';

// IMPORT SERVICESW
import { FindUsersService } from '../services/findUsers.service';
import { SignupUserService } from '../services/signupUser.service';
import { LoginUserService } from '../services/loginUser.service';
import { DeleteUsersService } from '../services/deleteUsers.service';
import { password } from '../../../shared/middlewares/zod/user.schema';
import { sign } from 'crypto';

describe('UserController', () => {
  // DECLARE TYPES
  let userController: UserController;

  let findUsersService: FindUsersService;
  let signupUserService: SignupUserService;
  let loginUserService: LoginUserService;
  let deleteUsersService: DeleteUsersService;

  beforeEach(() => {
    // DECLARE METHODS OF SERVICES HOW MOCK
    findUsersService = {
      execute: jest.fn(),
    } as unknown as FindUsersService;
    signupUserService = { execute: jest.fn() } as unknown as SignupUserService;
    loginUserService = { execute: jest.fn() } as unknown as LoginUserService;
    deleteUsersService = {
      execute: jest.fn(),
    } as unknown as DeleteUsersService;

    userController = new UserController(
      findUsersService,
      signupUserService,
      loginUserService,
      deleteUsersService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of users with status 200 when service succeeds', async () => {
    // ARRANGE
    const req = {} as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const output = {
      ok: true,
      err: false,
      val: [
        {
          id: '1',
          email: 'test@test.com',
          created_at: '2025-01-01T01:01:01.000A',
          updated_at: '2025-01-01T01:01:01.000A',
        },
      ],
    };

    // ACT
    (findUsersService.execute as jest.Mock).mockResolvedValue(output);
    await userController.find(req, res);

    // ASSERT
    expect(findUsersService.execute).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(output);
  });

  it('should return user registered with status 201 when service succeeds', async () => {
    // ARRANGE
    const req = {
      body: { email: 'test@test.com', password: 'test' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const output = {
      ok: true,
      err: false,
      val: {
        id: '1',
        email: 'test@test.com',
      },
    };

    // ACT
    (signupUserService.execute as jest.Mock).mockResolvedValue(output);
    await userController.signup(req, res);

    // ASSERT
    expect(signupUserService.execute).toHaveBeenCalledTimes(1);
    expect(signupUserService.execute).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(output);
  });
});
