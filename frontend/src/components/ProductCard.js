import React, { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import "../styles/ProductCard.css"; // Import CSS file for custom card styles

const ProductCard = ({ product }) => {
  const { buyProduct } = useContext(BlockchainContext);
  const handleBuy = async () => {
    await buyProduct(product.id, product.seller, product.price);
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={product.image} alt={product.name} />
        <span className="card-title">{product.name}</span>
      </div>
      <div className="card-content">        
        <p className="left"><strong>{product.price}<span className="blue-text text-darken-4">B</span></strong></p>
        <p className="right">{product.rating.stars}⭐</p><br/>
      </div>
      <div className="card-action center-align">
        <button className="buy-now-btn" onClick={handleBuy}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
