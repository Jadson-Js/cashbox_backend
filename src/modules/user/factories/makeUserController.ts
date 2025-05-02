import { FindUserService } from '../services/findUsers.service';
import { SignupUserService } from '../services/signupUser.service';
import { LoginUserService } from '../services/loginUser.service';
import { DeleteUserService } from '../services/deleteUser.service';

import { UserController } from '../controllers/user.controller';

import { PrismaUserRepository } from '../repositories/user.repository';

export function makeUserController() {
  const userRepository = new PrismaUserRepository();

  const findUserService = new FindUserService(userRepository);
  const signupUserService = new SignupUserService(userRepository);
  const loginUserService = new LoginUserService(userRepository);
  const deleteUserService = new DeleteUserService(userRepository);

  const userController = new UserController(
    findUserService,
    signupUserService,
    loginUserService,
    deleteUserService,
  );

  return userController;
}
