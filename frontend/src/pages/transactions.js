import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import "../styles/Transactions.css";

function Transactions() {
  const { transactions } = useContext(BlockchainContext);
  return (    
    <div className="maincontainer">
      <div className="transactions-container">
        <h1 className="transactions-heading">📜Transaction History</h1>
        <ul className="transactions-list">
          {transactions.map((tx, index) => (
            <li key={index} className="transaction-item">
              <div className="transaction-card">
                <p className="transaction-details">
                  <strong>Amount:</strong> {tx.amount} Blue
                </p>
                <p className="transaction-details">
                  <strong>From:</strong> {tx.sender}
                </p>
                <p className="transaction-details">
                  <strong>To:</strong> {tx.recipient}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
}

export default Transactions;
