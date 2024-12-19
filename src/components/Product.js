import React from "react";

// Functional component for rendering Products
function Product({ item, addToCart }) {
  return (
    <div className="product-item">
      <h3>{item.name}</h3>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
