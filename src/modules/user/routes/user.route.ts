import { Router } from 'express';
import { makeUserController } from '../factories/makeUserController';
import {
  signupSchemaBody,
  loginSchemaBody,
} from '../../../shared/middlewares/schemas-zod';
import { validate } from '../../../shared/middlewares/validate-zod';

const router = Router();

const userController = makeUserController();

router.get('/', (req, res) => {
  userController.find(req, res);
});

router.post('/signup', validate(signupSchemaBody, 'body'), (req, res) => {
  userController.signup(req, res);
});

router.post('/login', validate(loginSchemaBody, 'body'), (req, res) => {
  userController.login(req, res);
});

router.delete('/', (req, res) => {
  userController.delete(req, res);
});

export default router;
