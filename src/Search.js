import React from "react";

export function Search({ onChange, value, handleKeyPress, searchRef }) {
  return (
    <div className="searchContainer">
      <input
        ref={searchRef}
        autoComplete="off"
        id="search"
        onChange={onChange}
        value={value}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
