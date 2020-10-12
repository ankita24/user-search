import React, { useEffect, useRef } from "react";
import Highlighter from "react-highlight-words";

const Item = React.forwardRef(
  ({ item, index, searchText, handleMouseOver, handleKeyDown }, ref) => {
    const itemRef = useRef(null);
    function handleMouse() {
      handleMouseOver(index);
    }

    function onKeyDown(e) {
      e.preventDefault()
      handleKeyDown(e, index);
    }

    useEffect(() => {
      if (itemRef.current) {
        ref[index] = itemRef.current;
      }
    }, []);

    return (
      <div
        ref={itemRef}
        onMouseEnter={handleMouse}
        tabIndex={0}
        className="card"
        onKeyDown={onKeyDown}
      >
        {Object.keys(item).map((key) => (
          <div key={key}>
            <Highlighter
              searchWords={[searchText]}
              autoEscape={true}
              textToHighlight={item[key].toString()}
            />
          </div>
        ))}
      </div>
    );
  }
);

function DropdownInternal({
  list = [],
  searchText = "",
  listRef,
  handleMouseOver,
  handleKeyDown
}) {
  if (!searchText) {
    return null;
  }

  return (
    <div className="scroll">
      {!list.length ? (
        <div className="flex">No User Found</div>
      ) : (
        list.map((item, index) => (
          <Item
            ref={listRef}
            id={item.id}
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            searchText={searchText}
            handleMouseOver={handleMouseOver}
            handleKeyDown={handleKeyDown}
          />
        ))
      )}
    </div>
  );
}

export const Dropdown = React.memo(DropdownInternal);
