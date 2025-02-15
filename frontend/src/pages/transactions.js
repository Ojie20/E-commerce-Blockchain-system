import { useState, useEffect } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/transactions") // Adjust based on your node
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <div>
      <h1>📜 Transaction History</h1>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            <strong>Amount:</strong> {tx.amount} Blue |<strong> From:</strong>{" "}
            {tx.sender} |<strong> To:</strong> {tx.recipient}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
