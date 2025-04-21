import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionService } from '../services/transaction.service';
import { PrismaTransactionRepository } from '../repositories/transaction.repository';

const router = Router();

// Injeção manual das dependências (simples)
const userRepository = new PrismaTransactionRepository();
const userService = new TransactionService(userRepository);
const userController = new TransactionController(userService);

router.get('/', (req, res) => {
  userController.find(req, res);
});

export default router;
