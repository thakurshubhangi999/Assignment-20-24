import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

function App() {

  // Array categories with subcategories and products
  const categories = [
    {
      name: "Electronics",
      subcategories: [
        {
          name: "Computers",
          products: [
            "Lenovo Thinkpad",
            "Macbook Pro",
            "Dell XPS",
            "HP Pavilion",
          ],
        },
        {
          name: "Phones",
          products: ["iPhone", "Redmi Note", "Nokia", "Realme", "Samsung"],
        },
        {
          name: "Televisions",
          products: ["LG TV", "OnePlus", "Toshiba", "Xioami", "SONY"],
        },
      ],
    },
    {
      name: "Home Decor",
      subcategories: [
        {
          name: "Accessories",
          products: [
            "Photo Frames",
            "Clocks",
            "Candles",
            "Vases",
            "Mirrors",
            "Decorative Pillows",
            "Flower Pots",
          ],
        },
        {
          name: "Eco Friendly Decor",
          products: [
            "Indoor Plants",
            "Natural Light",
            "Recycled Materials",
            "Lamps",
          ],
        },
      ],
    },
    { name: "Fashion", subcategories: [] },
    {
      name: "Books",
      subcategories: [],
    },
  ];

  // State variables for active category, sub-category, and cart count
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Function to filter products based on active category and subcategory
  const activeProducts =
    categories
      .find((category) => category.name === activeCategory)
      ?.subcategories.find(
        (subcategory) => subcategory.name === activeSubcategory
      )?.products || [];

  // Function to handle adding items to the cart
  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  // Function to toggle category selection 
  const toggleCategory = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    } else {
      setActiveCategory(categoryName);
      setActiveSubcategory(null);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="app-name">Bengaluru eShopping</h1>
        <div className="cart">
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="cart-text">Cart</span>{" "}
          <span className="cart-count">{cartCount}</span>
        </div>
      </header>

      <div className="content">
        {/* Sidebar */}
        <div className="accordion">
          {categories.map((category, index) => (
            <div key={index}>
              <div
                className={`accordion-item ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => toggleCategory(category.name)}
              >
                <FontAwesomeIcon
                  icon={
                    activeCategory === category.name
                      ? faCircleMinus
                      : faCirclePlus
                  }
                  className="category-icon"
                />
                {category.name}
              </div>
              {activeCategory === category.name && (
                <div className="subcategories">
                  {category.subcategories.length > 0 ? (
                    category.subcategories.map((subcategory, subIndex) => (
                      <div
                        key={subIndex}
                        className={`subcategory-item ${
                          activeSubcategory === subcategory.name ? "active" : ""
                        }`}
                        onClick={() =>
                          setActiveSubcategory(
                            activeSubcategory === subcategory.name
                              ? null
                              : subcategory.name
                          )
                        }
                      >
                        {subcategory.name}
                      </div>
                    ))
                  ) : (
                    <div className="no-subcategories">
                      No subcategories available
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="product-list">
          {activeSubcategory ? (
            <>
              <h2
                className={`subcategory-header ${
                  activeSubcategory ? "subcategory-border" : ""
                }`}
              >
                {activeSubcategory}
              </h2>
              <div className="product-grid">
                {activeProducts.map((product, index) => (
                  <div key={index} className="product-item">
                    <p>{product}</p>
                    <button onClick={addToCart}>Add to cart</button>{" "}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2>Explore Our Product Categories</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
