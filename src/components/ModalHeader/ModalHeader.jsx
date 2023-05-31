import React from "react";
import cross from "../../assets/Vector.svg";

const ModalHeader = ({children, updateState}) => {
  return (
    <div className="modal-top">
      <h1>{children}</h1>
      <button className="modal-top__button" onClick={updateState}>
        <img src={cross} alt="cross" />
      </button>
    </div>
  );
};

export default ModalHeader;
