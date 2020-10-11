import React from "react";

export function Search({ onChange, value, handleKeyPress }) {
  return (
    <div className="searchContainer">
      <input
        autoComplete="off"
        id="search"
        onChange={onChange}
        value={value}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
