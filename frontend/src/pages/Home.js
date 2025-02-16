import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

function Home() {
  const { balance } = useContext(BlockchainContext);

  return (
    <div>
      <h1>🛒 Welcome to Blue Marketplace</h1>
      <p>
        Earn and spend <strong>Blue</strong>, our blockchain-based currency!
      </p>

      <h2>💰 Your Balance: {balance} Blue</h2>

      <nav>
        <ul>
          <li>
            <Link to="/marketplace">🛍️ View Products</Link>
          </li>
          <li>
            <Link to="/transactions">📜 Transaction History</Link>
          </li>
          <li>
            <Link to="/mine">⛏️ Mine Blue</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
