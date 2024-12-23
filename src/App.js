import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import PopupConfirm from "./components/PopupConfirm";

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
    { name: "Books", subcategories: [] },
  ];

  // State variables for managing active category, subcategory, cart count, popup, and selected product
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [cartProducts, setCartProducts] = useState(new Set());

  // Function to filter products based on active category and subcategory
  const activeProducts =
    categories
      .find((category) => category.name === activeCategory)
      ?.subcategories.find(
        (subcategory) => subcategory.name === activeSubcategory
      )?.products || [];

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

  // Function to handle adding items to the cart
  const AddToCart = (product) => {
    if (!cartProducts.has(product)) {
      setSelectedProduct(product);
      setShowPopup(true);
    }
  };

  // Confirm adding product to the cart
  const handleConfirm = () => {
    setCartProducts(new Set(cartProducts.add(selectedProduct)));
    setCartCount(cartCount + 1);
    setShowPopup(false);
  };

  // Cancel action in popup
  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <h1 className="app-name">Bengaluru eShopping</h1>
        <div className="cart">
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="cart-text">Cart</span>{" "}
          <span className="cart-count">{cartCount}</span>
        </div>
      </header>

      <div className="content">
        {/* Accordion for category */}
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
              {/* Subcategories list */}
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

        {/* Product list */}
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
                    <button
                      onClick={() => AddToCart(product)}
                      disabled={cartProducts.has(product)}
                      className={
                        cartProducts.has(product) ? "added-to-cart" : ""
                      }
                    >
                      {cartProducts.has(product)
                        ? "Added to Cart"
                        : "Add to cart"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2>Explore Our Product Categories</h2>
          )}
        </div>
      </div>
      {/* Confirmation Popup for adding products to cart */}
      {showPopup && (
        <PopupConfirm
          message={`Are you sure you want to add ${selectedProduct} to the cart?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default App;
