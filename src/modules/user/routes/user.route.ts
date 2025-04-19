import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { PrismaUserRepository } from '../repositories/user.repository';

const router = Router();

// Injeção manual das dependências (simples)
const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', (req, res) => {
  userController.find(req, res);
});

router.post('/', (req, res) => {
  userController.create(req, res);
});

export default router;
