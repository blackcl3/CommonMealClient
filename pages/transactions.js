import React, { useEffect, useState } from 'react';
import { getTransactionsAndDisplayNames } from '../api/mergedData';
import TransactionCard from '../components/TransactionCard';

export default function TransactionsPage() {
  const [transaction, setTransactions] = useState([]);

  const getAllTransactions = () => {
    getTransactionsAndDisplayNames().then(setTransactions);
  };

  useEffect(() => {
    getAllTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>Transactions Page</div>
      {transaction?.map((transactionObj) => (
        <TransactionCard key={transactionObj.transactionFirebaseKey} obj={transactionObj} onChange={getAllTransactions} onUpdate={getTransactionsAndDisplayNames} />
      ))}
    </>
  );
}
