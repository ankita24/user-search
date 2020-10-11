import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import { headers } from "./constants";
import debounce from "./debounceFn";
import { userDetails } from "./mockData";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    let input = e.target.value;
    debounceSearch(input);
  };

  const debounceSearch = debounce((input) => {
    if (input === "") {
      setData([]);
      setInput("");
    } else {
      const keys = headers;
      let finalData = [];
      const inputToSearch = String(input).toLowerCase();
      keys.forEach((item) => {
        const data = userDetails.filter((info) => {
          if (Array.isArray(info[item])) {
            // wtf thike. String includes does partial matching
            // ye batoa, saare results line by line kyun aa rahe hain?
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
      setInput(input);
      setData(finalData);
    }
  }, 1000);
  return (
    <div className="App">
      <input id="search" onChange={handleChange} />
      <div className="scroll">
        {!!data.length ? (
          data.map((item, index) => (
            <div className="card" key={`${item.id}-${index}`}>
              {headers.map((info) => (
                <div
                  key={info}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Highlighter
                    searchWords={[input]}
                    autoEscape={true}
                    textToHighlight={item[info].toString()}
                  />
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex">No User Found</div>
        )}
      </div>
    </div>
  );
}
