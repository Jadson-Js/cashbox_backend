import { FindUserService } from '../services/find-user.service';
import { SignupUserService } from '../services/signup-user.service';
import { UserController } from '../controllers/user.controller';
import { PrismaUserRepository } from '../repositories/user.repository';
import { LoginUserService } from '../services/login-user.service';
import { DeleteUserService } from '../services/delete-user.service';

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
