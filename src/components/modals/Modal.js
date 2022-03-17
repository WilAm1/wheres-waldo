import React from "react";
import "./Modal-style.scss";

export default function Modal({ children, show }) {
  const isVisible = show ? "modal visible" : "modal";
  return (
    <div className={isVisible}>
      <div className="modal-content">{children}</div>
    </div>
  );
}
