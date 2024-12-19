import React from "react";

// Functional component for rendering an accordion
function Accordion({ items, activeItem, setActiveItem }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <div
          key={item.id}
          className={`accordion-item ${activeItem === item.id ? "active" : ""}`}
          onClick={() => setActiveItem(item.id)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
