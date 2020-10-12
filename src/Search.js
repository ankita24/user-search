import React from "react";

export function Search({ onChange, value, handleKeyPress, searchRef }) {
  function moveCursorToEnd() {
    if (searchRef.current) {
      const self = searchRef.current;
      self.selectionStart = self.selectionEnd = self.value.length;
    }
  }
  return (
    <div className="searchContainer">
      <input
        placeholder="Search user by ID, address,name... "
        ref={searchRef}
        autoComplete="off"
        id="search"
        onChange={onChange}
        value={value}
        onKeyDown={handleKeyPress}
        onFocus={moveCursorToEnd}
      />
    </div>
  );
}
