import React, { useContext, useEffect, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import "../styles/Wallet.css"; // Import external CSS file for custom styles

const Wallet = () => {
  const { userAddress, getUserBalance } = useContext(BlockchainContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (userAddress) {
      getUserBalance(userAddress).then(setBalance);
    }
  }, [userAddress]);

  return (
    <div className="wallet-container">
      <div className="card">
        <div className="card-content">
          <h4 className="center-align">💼 Wallet</h4>
          <p className="address-text"><strong>Your Address:</strong> {userAddress}</p>
          <p className="balance-text"><strong>Balance:</strong> {balance} BLUE</p>
          <div className="wallet-actions center-align">
            <button className="btn waves-effect waves-light blue darken-2">Deposit</button>
            <button className="btn waves-effect waves-light blue darken-2">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
