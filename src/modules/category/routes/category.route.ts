import { Router } from 'express';
import { makeCategoryController } from '../factories/makeCategoryController';
import {
  createSchemaBody,
  updateSchemaParams,
  updateSchemaBody,
  deleteSchemaParams,
} from '../../../shared/middlewares/schemas-zod';
import { validate } from '../../../shared/middlewares/validate-zod';

const router = Router();

const categoryController = makeCategoryController();

router.get('/', (req, res) => {
  categoryController.find(req, res);
});

router.post('/', validate(createSchemaBody, 'body'), (req, res) => {
  categoryController.create(req, res);
});

router.patch(
  '/id/:id',
  validate(updateSchemaParams, 'params'),
  validate(updateSchemaBody, 'body'),
  (req, res) => {
    categoryController.update(req, res);
  },
);

router.delete('/id/:id', validate(deleteSchemaParams, 'params'), (req, res) => {
  categoryController.delete(req, res);
});

export default router;
