import React, { useState, useCallback, useRef } from "react";
import { headers } from "./constants";
import debounce from "./debounceFn";
import { Dropdown } from "./Dropdown";
import { userDetails } from "./mockData";
import { Search } from "./Search";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const listRef = useRef([]);

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
    debounceSearch(e.target.value);
    listRef.current = [];
  }, []);

  const debounceSearch = debounce((input) => {
    if (input === "") {
      setData([]);
    } else {
      const keys = headers;
      let finalData = [];
      const inputToSearch = String(input).toLowerCase();
      keys.forEach((item) => {
        const data = userDetails.filter((info) => {
          if (Array.isArray(info[item])) {
            return (
              info[item]
                .map((t) => t.toLowerCase())
                .findIndex((item) => item.includes(inputToSearch)) >= 0
            );
          } else {
            return String(info[item]).toLowerCase().includes(inputToSearch);
          }
        });

        finalData = [...finalData, ...data];
      });
      setData(finalData);
    }
  }, 1000);

  const handleKeyPress = (e) => {
    if (e.key === "ArrowDown") {
      if (listRef.current) {
        listRef.current[0] && listRef.current[0].focus();
      }
    }
  };

  function handleMouseOver(id) {
    if (listRef.current) {
      listRef.current[id].focus();
    }
  }

  const handleItemKeyDown = (key, id) => {
    if (listRef.current) {
      if (key === "ArrowDown") {
        if (listRef.current[id + 1]) {
          listRef.current[id + 1].focus();
        }
      } else if (key === "ArrowUp") {
        if (listRef.current[id - 1]) {
          listRef.current[id - 1].focus();
        }
      }
    }
  };

  console.log(listRef.current)
  return (
    <>
      <div className="App">
        <Search
          onChange={handleChange}
          value={input}
          handleKeyPress={handleKeyPress}
        />
        <Dropdown
          key={input}
          listRef={listRef.current}
          list={data}
          searchText={input}
          handleMouseOver={handleMouseOver}
          handleKeyDown={handleItemKeyDown}
        />
      </div>
    </>
  );
}
