import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/transactionData';
import TransactionCard from '../components/TransactionCard';

export default function TransactionsPage() {
  const [transaction, setTransactions] = useState([]);

  const getAllTransactions = () => {
    getTransactions().then(setTransactions);
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <>
      <div>Transactions Page</div>
      {transaction?.map((transactionObj) => (
        <TransactionCard obj={transactionObj} onChange={getAllTransactions} onUpdate={getTransactions} />
      ))}
    </>
  );
}
