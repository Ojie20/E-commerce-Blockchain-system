import React from "react";

const PurchaseCard = ({ product }) => {
  return (
    <div className="product-card card">
      <h3>{product.name}</h3>
      <p>Seller Address: {product.seller}</p>
      <p>Price: {product.price} BLUE🪙</p>
    </div>
  );
};

export default PurchaseCard;
