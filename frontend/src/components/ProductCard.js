import React, { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

const ProductCard = ({ product }) => {
  const { buyProduct } = useContext(BlockchainContext);

  const handleBuy = async () => {
    await buyProduct(product.id, product.seller, product.price);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Seller Address:{product.seller}</p>
      <p>Price: {product.price} BLUE</p>
      <button onClick={handleBuy}>Buy Now</button>
    </div>
  );
};

export default ProductCard;
