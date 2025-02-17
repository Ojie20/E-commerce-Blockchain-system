import React from "react";
import "../styles/ProductCard.css"; // Import CSS file for custom card styles

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={product.image} alt={product.name} />
        <span className="card-title">{product.name}</span>
      </div>
      <div className="card-content">        
        <p className="left"><strong>${product.price}</strong></p>
        <p className="right">{product.rating.stars}⭐</p><br/>
      </div>
      <div className="card-action center-align">
        <a href="#!">Buy Now</a>
      </div>
    </div>
  );
};

export default ProductCard;
