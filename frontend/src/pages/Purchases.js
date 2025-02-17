import { useContext, useEffect, useState, useMemo } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import PurchaseCard from "../components/PurchaseCard";

function Purchases() {
  const [products, setProducts] = useState([]);
  const { transactions } = useContext(BlockchainContext);
  // const purchases = transactions.filter((tx) => tx.productId);
  const purchases = useMemo(
    () => transactions.filter((tx) => tx.productId),
    [transactions]
  );
  console.log(purchases);
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
    console.log(purchasedProductsIds);

    const boughtProducts = products.filter((product) =>
      purchasedProductsIds.includes(product.id)
    );
    console.log(boughtProducts);

    setPurchasedProducts(boughtProducts);
  }, [purchases]);
  return (
    <div>
      <h1>📜 Transaction History</h1>
      <ul>
        {purchasedProducts.map((product) => (
          <PurchaseCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default Purchases;
