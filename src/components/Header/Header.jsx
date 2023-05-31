import React from "react";

export const Header = ({openTheWindow }) => {
  return (
    <div className="header">
      <button className="header-item" onClick={(event) => openTheWindow(event)}>
        CREATE
      </button>
      <button className="header-item" onClick={(event) => openTheWindow(event)}>
        PLACES
      </button>
    </div>
  );
};
