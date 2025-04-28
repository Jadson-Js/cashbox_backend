import { Router } from 'express';
import { makeCategoryController } from '../factories/makeCategoryController';
import { verifyAuthToken } from '../../../shared/middlewares/auth';
import {
  createSchemaBody,
  updateSchemaParams,
  updateSchemaBody,
  deleteSchemaParams,
} from '../../../shared/middlewares/zod/schemas-zod';
import { validate } from '../../../shared/middlewares/zod/validate-zod';

const router = Router();

const categoryController = makeCategoryController();

router.get('/', verifyAuthToken, (req, res) => {
  categoryController.find(req, res);
});

router.post(
  '/',
  verifyAuthToken,
  validate(createSchemaBody, 'body'),
  (req, res) => {
    categoryController.create(req, res);
  },
);

router.patch(
  '/id/:id',
  verifyAuthToken,
  validate(updateSchemaParams, 'params'),
  validate(updateSchemaBody, 'body'),
  (req, res) => {
    categoryController.update(req, res);
  },
);

router.delete(
  '/id/:id',
  verifyAuthToken,
  validate(deleteSchemaParams, 'params'),
  (req, res) => {
    categoryController.delete(req, res);
  },
);

export default router;
