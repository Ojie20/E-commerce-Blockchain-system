import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px", color: "white" }}>
        Home
      </Link>
      <Link to="/marketplace" style={{ marginRight: "15px", color: "white" }}>
        Marketplace
      </Link>
      <Link to="/wallet" style={{ marginRight: "15px", color: "white" }}>
        Wallet
      </Link>
      <Link to="/transactions" style={{ color: "white" }}>
        Transactions
      </Link>
      <li>
        <Link to="/mine" style={{ color: "white" }}>
          Mine
        </Link>
      </li>
    </nav>
  );
};

export default Navbar;
