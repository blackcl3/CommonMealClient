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
      <h1 className="transactions-h1">Transactions Page</h1>
      <div className="transactions-container">
        {transaction?.map((transactionObj) => (
          <TransactionCard className="transaction-card" key={transactionObj.transactionFirebaseKey} obj={transactionObj} onChange={getAllTransactions} onUpdate={getTransactionsAndDisplayNames} />
        ))}
      </div>
    </>
  );
}
