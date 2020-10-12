import React from "react";

export function Search({ onChange, value, handleKeyPress, searchRef }) {
  function moveCursorToEnd() {
    // move cursor to the end on focus
    if (searchRef.current) {
      const self = searchRef.current;
      self.selectionStart = self.selectionEnd = self.value.length;
    }
  }
  return (
    <div className="searchContainer">
      <input
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
