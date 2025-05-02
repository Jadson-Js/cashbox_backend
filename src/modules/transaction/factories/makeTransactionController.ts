import { FindTransactionByUserIdService } from '../services/findByUserId-transaction.service';
import { CreateTransactionService } from '../services/create-transaction.service';
import { UpdateTransactionService } from '../services/update-transaction.service';
import { DeleteTransactionService } from '../services/delete-transaction.service';

import { TransactionController } from '../controllers/transaction.controller';
import { PrismaTransactionRepository } from '../repositories/transaction.repository';
import { CheckTransactionOwnerService } from '../services/checkOwner-transaction.service';

export function makeTransactionController() {
  const transactionRepository = new PrismaTransactionRepository();

  const findTransactionByUserIdService = new FindTransactionByUserIdService(
    transactionRepository,
  );
  const createTransactionService = new CreateTransactionService(
    transactionRepository,
  );

  const checkTransactionOwnerService = new CheckTransactionOwnerService(
    transactionRepository,
  );

  const updateTransactionService = new UpdateTransactionService(
    transactionRepository,
    checkTransactionOwnerService,
  );

  const deleteTransactionService = new DeleteTransactionService(
    transactionRepository,
    checkTransactionOwnerService,
  );

  const transactionController = new TransactionController(
    findTransactionByUserIdService,
    createTransactionService,
    updateTransactionService,
    deleteTransactionService,
  );

  return transactionController;
}
