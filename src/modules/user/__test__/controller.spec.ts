// IMPORT DEPENDENCIES
import { Request, Response } from 'express';

// IMPORT CONTROLLER
import { UserController } from '../controllers/user.controller';

// IMPORT SERVICESW
import { FindUsersService } from '../services/findUsers.service';
import { SignupUserService } from '../services/signupUser.service';
import { LoginUserService } from '../services/loginUser.service';
import { DeleteUsersService } from '../services/deleteUsers.service';

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
      err: false,
      val: [
        {
          id: '1',
          email: 'test@test.com',
          created_at: '2025-01-01T01:01:01.572Z',
          updated_at: '2025-01-01T01:01:01.572Z',
        },
      ],
    };

    // ACT
    (findUsersService.execute as jest.Mock).mockResolvedValue(output);
    await userController.find(req, res);

    // ASSERT
    expect(findUsersService.execute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(output);
  });
});
