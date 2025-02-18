import { useContext, useEffect, useState, useMemo } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import PurchaseCard from "../components/PurchaseCard";
import "../styles/Purchases.css"; // Import the stylesheet

function Purchases() {
  const [products, setProducts] = useState([]);
  const { transactions } = useContext(BlockchainContext);

  const purchases = useMemo(
    () => transactions.filter((tx) => tx.productId),
    [transactions]
  );

  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products") // Replace with backend API
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const purchasedProductsIds = purchases.map(
      (purchase) => purchase.productId
    );

    const boughtProducts = products.filter((product) =>
      purchasedProductsIds.includes(product.id)
    );

    setPurchasedProducts(boughtProducts);
  }, [purchases, products]); // Added `products` dependency

  return (
    <div className="maincontainer">
      <div className="purchases-container">
        <h1 className="purchases-header">📜 Transaction History</h1>
        <div className="purchases-list">
          {purchasedProducts.length > 0 ? (
            purchasedProducts.map((product) => (
              <PurchaseCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-purchases">No purchases made yet.</p>
          )}
        </div>
      </div>
    </div>
    
  );
}

export default Purchases;
