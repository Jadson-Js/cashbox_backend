import { Router } from 'express';
import { makeCategoryController } from '../factories/makeCategoryController';
import { createSchema } from '../../../shared/middlewares/schemas-zod';
import { validate } from '../../../shared/middlewares/validate-zod';

const router = Router();

const categoryController = makeCategoryController();

/* router.get('/', (req, res) => {
  categoryController.find(req, res);
}); */

router.post('/', validate(createSchema), (req, res) => {
  categoryController.create(req, res);
});

/* router.post('/login', validate(loginSchema), (req, res) => {
  categoryController.login(req, res);
}); */

/* router.delete('/', (req, res) => {
  categoryController.delete(req, res);
}); */

export default router;
