import { FindTransactionsByUserIdService } from '../services/findTransactionByUserId.service';
import { CreateTransactionService } from '../services/createTransaction.service';
import { UpdateTransactionByIdService } from '../services/updateTransactionById.service';
import { DeleteTransactionByIdService } from '../services/deleteTransactionById.service';

import { TransactionController } from '../controllers/transaction.controller';
import { PrismaTransactionRepository } from '../repositories/transaction.repository';

export function makeTransactionController() {
  const transactionRepository = new PrismaTransactionRepository();

  const findTransactionsByUserIdService = new FindTransactionsByUserIdService(
    transactionRepository,
  );
  const createTransactionService = new CreateTransactionService(
    transactionRepository,
  );

  const updateTransactionByIdService = new UpdateTransactionByIdService(
    transactionRepository,
  );

  const deleteTransactionByIdService = new DeleteTransactionByIdService(
    transactionRepository,
  );

  const transactionController = new TransactionController(
    findTransactionsByUserIdService,
    createTransactionService,
    updateTransactionByIdService,
    deleteTransactionByIdService,
  );

  return transactionController;
}
