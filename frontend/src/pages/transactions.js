import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

function Transactions() {
  const { transactions } = useContext(BlockchainContext);

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
