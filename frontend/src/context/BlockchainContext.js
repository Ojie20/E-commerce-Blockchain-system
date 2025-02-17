import React, { createContext, useState, useCallback, useEffect } from "react";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [miningStatus, setMiningStatus] = useState("");

  // Define the mine function
  const mineBlue = async () => {
    setMiningStatus("Mining in Progress......Please wait and don't interact");
    // setUserAddress(address);
    setUserAddress("UserAddress");
    try {
      const response = await fetch(
        `http://localhost:3001/mine/${userAddress}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        // Update balance after mining
        getUserBalance(userAddress);
        setMiningStatus(
          "Mining Successful! A new block has been added to the blockchain"
        );
      } else {
        console.error("Mining failed:", data.note);
      }
    } catch (error) {
      console.error("Error during mining:", error);
      setMiningStatus("Failed to mine block, please try again");
    }
  };

  const getUserBalance = useCallback(
    async (address) => {
      // setUserAddress(address);
      setUserAddress("UserAddress");
      const response = await fetch(
        `http://localhost:3001/wallet/${userAddress}`
      );
      const data = await response.json();
      setBalance(data.balance);
      return data.balance;
    },
    [userAddress]
  );

  // Fetch user transactions from the backend
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/transactions/${userAddress}`
      );
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userAddress]);

  const buyProduct = async (productId, seller, price) => {
    const buyer = "UserAddress";
    console.log(productId, buyer, seller, price);
    try {
      const response = await fetch("http://localhost:3001/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer: buyer,
          seller,
          productId,
          amount: price,
          // Replace with the actual buyer address
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Purchase successful!");
        // Optionally update user balance or product availability here
        getUserBalance(userAddress);
      } else {
        alert("Purchase failed: " + data.message);
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Error purchasing product");
    }
  };

  useEffect(() => {
    getUserBalance(userAddress);
    fetchTransactions(userAddress);
  }, [getUserBalance, fetchTransactions, userAddress]);
  return (
    <BlockchainContext.Provider
      value={{
        userAddress,
        buyProduct,
        setUserAddress,
        getUserBalance,
        balance,
        mineBlue,
        transactions,
        miningStatus,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
