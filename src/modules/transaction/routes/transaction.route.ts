import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionService } from '../services/transaction.service';
import { PrismaTransactionRepository } from '../repositories/transaction.repository';
import { PrismaUserRepository } from '../../user/repositories/user.repository';

const router = Router();

// Injeção manual das dependências (simples)
const transactionRepository = new PrismaTransactionRepository();
const userRepository = new PrismaUserRepository();

const transactionService = new TransactionService(
  transactionRepository,
  userRepository,
);
const transactionController = new TransactionController(transactionService);

router.get('/', (req, res) => {
  transactionController.find(req, res);
});

router.post('/', (req, res) => {
  transactionController.create(req, res);
});

export default router;
