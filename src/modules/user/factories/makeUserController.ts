import { FindUsersService } from '../services/findUsers.service';
import { SignupUserService } from '../services/signupUser.service';
import { LoginUserService } from '../services/loginUser.service';
import { DeleteUsersService } from '../services/deleteUsers.service';

import { UserController } from '../controllers/user.controller';

import { PrismaUserRepository } from '../repositories/user.repository';

export function makeUserController() {
  const userRepository = new PrismaUserRepository();

  const findUsersService = new FindUsersService(userRepository);
  const signupUserService = new SignupUserService(userRepository);
  const loginUserService = new LoginUserService(userRepository);
  const deleteUsersService = new DeleteUsersService(userRepository);

  const userController = new UserController(
    findUsersService,
    signupUserService,
    loginUserService,
    deleteUsersService,
  );

  return userController;
}
