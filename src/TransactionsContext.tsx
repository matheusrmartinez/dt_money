import {createContext, useEffect, useState, ReactNode} from 'react'
import { api } from './services/api';


interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransctionsContextData {
  transactions: Transaction[];
  createTransaction(value: TransactionInput): void;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

export const TransactionsContext = createContext<TransctionsContextData>({} as TransctionsContextData); 


export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([] as Transaction[]);

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  }, [])

  function createTransaction(transaction: TransactionInput){

    api.post('/transactions', transaction)
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}