import { Router } from 'express';
import { makeUserController } from '../factories/makeUserController';

const router = Router();

const userController = makeUserController();

router.get('/', (req, res) => {
  userController.find(req, res);
});

router.post('/signup', (req, res) => {
  userController.signup(req, res);
});

router.post('/login', (req, res) => {
  userController.login(req, res);
});

router.delete('/', (req, res) => {
  userController.delete(req, res);
});

export default router;
