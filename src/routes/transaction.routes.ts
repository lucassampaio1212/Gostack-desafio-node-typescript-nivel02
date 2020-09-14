import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

// const transactionsRepository = new TransactionsRepository();
const transactionRepository =  new TransactionsRepository();
transactionRouter.get('/', (request, response) => {
  try {

    const transaction = transactionRepository.all();
    const balance = transactionRepository.getBalance();

    return response.json({
        transaction,
        balance
    })

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const CreateTransaction = new CreateTransactionService(
      transactionRepository
    );
    const transaction = CreateTransaction.execute({
      title,
      value,
      type
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
