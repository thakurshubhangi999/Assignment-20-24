import React from "react";
import "./SearchField.css";

function SearchField({ searchQuery, setSearchQuery }) {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for subcategories"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchField;
