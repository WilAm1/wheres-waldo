import React, { useState } from "react";
import Modal from "./Modal";

export default function Introduction({ isDisabled, handleOpen }) {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(false);
    handleOpen();
  };
  return (
    <>
      <Modal show={show}>
        <div className="modal-header">
          <h1>Where's Waldo</h1>
        </div>
        <div className="modal-body introduction">
          <div>
            <h3>Mechnanics </h3>
            <p>Find all the characters to complete the Game!</p>
            <p>
              Make sure to finish the game first. Check your time compared to
              other competitors!
            </p>
            <p>Are you Ready?</p>
          </div>
          <button
            onClick={handleClick}
            disabled={isDisabled}
            className="btn btn-start"
          >
            {isDisabled ? "Loading Image" : "Let's Start"}
          </button>
        </div>
      </Modal>
    </>
  );
}
