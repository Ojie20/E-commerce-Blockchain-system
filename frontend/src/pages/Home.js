import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [balance, setBalance] = useState(0);

  // Fetch user balance from blockchain API (Modify API URL as needed)
  useEffect(() => {
    fetch("http://localhost:3001/wallet/user123") // Replace with actual backend route
      .then((response) => response.json())
      .then((data) => setBalance(data.balance))
      .catch((error) => console.error("Error fetching balance:", error));
  }, []);

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
