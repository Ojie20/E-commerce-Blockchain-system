import React, { createContext, useState, useCallback } from "react";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState("");

  const getUserBalance = useCallback(async (address) => {
    const response = await fetch(`http://localhost:3001/wallet/${address}`);
    const data = await response.json();
    return data.balance;
  }, []);

  const buyProduct = async (productId, seller, price) => {
    try {
      const response = await fetch("http://localhost:3001/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          price,
          seller,
          buyer: "userAddress", // Replace with the actual buyer address
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Purchase successful!");
        // Optionally update user balance or product availability here
      } else {
        alert("Purchase failed: " + data.message);
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Error purchasing product");
    }
  };

  return (
    <BlockchainContext.Provider
      value={{ userAddress, buyProduct, setUserAddress, getUserBalance }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
