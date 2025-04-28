import { Router } from 'express';
import { makeTransactionController } from '../factories/makeTransactionController';
import { verifyAuthToken } from '../../../shared/middlewares/auth';
import { createSchemaBody } from '../../../shared/middlewares/zod/transactions.schema';
import { validate } from '../../../shared/middlewares/zod/validate-zod';

const router = Router();

const transactionController = makeTransactionController();

/* router.get('/', verifyAuthToken, (req, res) => {
  transactionController.find(req, res);
}); */

router.post(
  '/',
  verifyAuthToken,
  validate(createSchemaBody, 'body'),
  (req, res) => {
    transactionController.create(req, res);
  },
);
/*
router.patch(
  '/id/:id',
  verifyAuthToken,
  validate(updateSchemaParams, 'params'),
  validate(updateSchemaBody, 'body'),
  (req, res) => {
    transactionController.update(req, res);
  },
);

router.delete(
  '/id/:id',
  verifyAuthToken,
  validate(deleteSchemaParams, 'params'),
  (req, res) => {
    transactionController.delete(req, res);
  },
);
*/

export default router;
