import express from 'express';
import userRoutes from './modules/user/routes/user.route';
import categoryRoutes from './modules/category/routes/category.route';
import transactionRoutes from './modules/transaction/routes/transaction.route';
import { errorHandler } from './shared/middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/transactions', transactionRoutes);

app.use(errorHandler);

export default app;
