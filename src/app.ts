import express from 'express';
import userRoutes from './modules/user/routes/user.route';
import transactionRoutes from './modules/transaction/routes/transaction.route';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

export default app;
