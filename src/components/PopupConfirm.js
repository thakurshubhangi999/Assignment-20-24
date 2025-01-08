import React, { useEffect } from "react";

// Functional component for rendering a confirmation Popup
const PopupConfirm = ({ message, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        console.log(onConfirm);
        onCancel();
      }
    };
    if (onConfirm) {
      window.addEventListener("keydown", handleKeydown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onConfirm, onCancel]);
  if (!onConfirm) return null;

  return (
    <div className="popup-window">
      <div className="popup">
        <p>{message}</p>
        <div className="popup-buttons">
          <button className="popup-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="popup-button" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirm;
