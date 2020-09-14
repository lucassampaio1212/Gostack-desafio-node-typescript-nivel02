import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transaction =  this.transactions;

    return transaction;

  }

  public getBalance(): Balance {
    const {income,outcome} = this.transactions.reduce((acumuletor: Balance,transaction: Transaction) => {
      switch (transaction.type) {
        case 'income':
          acumuletor.income += transaction.value;

          break;
        case 'outcome':
          acumuletor.outcome += transaction.value

        default:
          break;
      }
      return acumuletor;
    },{
      income: 0,
      outcome: 0,
      total: 0
    })
    const total = income - outcome;
    return {income,outcome,total};
  }

  public create({title,value,type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
