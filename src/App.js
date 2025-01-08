import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import PopupConfirm from "./components/PopupConfirm";
import SearchField from "./components/SearchField";

function App() {
  const categories = [
    {
      name: "Electronics",
      subcategories: [
        {
          name: "Computers",
          products: ["Lenovo Thinkpad", "Macbook Pro", "Dell XPS", "HP Pavilion"],
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

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [cartProducts, setCartProducts] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  
const activeProducts =
categories
  .find((category) => category.name === activeCategory)
  ?.subcategories.find(
    (subcategory) => subcategory.name === activeSubcategory
  )?.products || [];

  const toggleCategory = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    } else {
      setActiveCategory(categoryName);
      setActiveSubcategory(null);
    }
  };

  const AddToCart = (product) => {
    if (!cartProducts.has(product)) {
      setSelectedProduct(product);
      setShowPopup(true);
    }
  };

  const handleConfirm = () => {
    setCartProducts(new Set(cartProducts.add(selectedProduct)));
    setCartCount(cartCount + 1);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

const filteredCategories = categories.map((category) => ({
  ...category,
  subcategories: category.subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(searchQuery)
  ),
}));

const searchedSubcategories = categories
  .flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      ...subcategory,
      categoryName: category.name,
    }))
  )
  .filter((subcategory) => subcategory.name.toLowerCase().includes(searchQuery));

return (
  <div className="app">
    <header className="header">
      <h1 className="app-name">Bengaluru eShopping</h1>
      <div className="cart">
        <FontAwesomeIcon icon={faCartShopping} />
        <span className="cart-text">Cart</span>{" "}
        <span className="cart-count">{cartCount}</span>
      </div>
    </header>

    <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

    <div className="content">
      {searchQuery && searchedSubcategories.length > 0 ? (
        <div>
          {searchedSubcategories.map((subcategory, index) => (
            <div key={index} className="subcategory-search-item">
              <h3>{subcategory.name} (in {subcategory.categoryName})</h3>
              <div className="product-grid">
                {subcategory.products.map((product, productIndex) => (
                  <div key={productIndex} className="product-item">
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
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="accordion">
            {filteredCategories.map((category, i) => (
              <div key={i}>
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
                      category.subcategories.map(
                        (subcategory, subIndex) => (
                          <div
                            key={subIndex}
                            className={`subcategory-item ${
                              activeSubcategory === subcategory.name
                                ? "active"
                                : ""
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
                        )
                      )
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

          {/* Product list for active subcategory */}
          <div className="product-list">
            {activeSubcategory ? (
              <>
                <h2 className="subcategory-header">{activeSubcategory}</h2>
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
        </>
      )}
    </div>

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