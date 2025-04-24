import { Router } from 'express';
import { makeUserController } from '../factories/makeUserController';
import {
  signupSchema,
  loginSchema,
} from '../../../shared/middlewares/schemas-zod';
import { validate } from '../../../shared/middlewares/validate-zod';

const router = Router();

const userController = makeUserController();

router.get('/', (req, res) => {
  userController.find(req, res);
});

router.post('/signup', validate(signupSchema), (req, res) => {
  userController.signup(req, res);
});

router.post('/login', validate(loginSchema), (req, res) => {
  userController.login(req, res);
});

router.delete('/', (req, res) => {
  userController.delete(req, res);
});

export default router;
