import React, { useContext, useEffect, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

const Wallet = () => {
  const { userAddress, getUserBalance } = useContext(BlockchainContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (userAddress) {
      getUserBalance(userAddress).then(setBalance);
    }
  }, [userAddress]);

  return (
    <div>
      <h1>Wallet</h1>
      <p>Your Address: {userAddress}</p>
      <p>Balance: {balance} BLUE</p>
    </div>
  );
};

export default Wallet;
