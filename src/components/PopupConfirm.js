import React from "react";

// Functional component for rendering a confirmation Popup
const PopupConfirm = ({ message, onConfirm, onCancel }) => {
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
  )
}

export default PopupConfirm;
