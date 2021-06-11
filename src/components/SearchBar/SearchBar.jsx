import React from "react";

import "./SearchBar.css";

const inputStyle = {
  border: "1.8px solid #fff",
  background: "transparent",
  color: "white",
};

const btnStyle = {
  background: "#0821d4",
};

function SearchBar({ theme }) {
  return (
    <section className="searchbar-container">
      <form className="search-form">
        <input
          type="text"
          className="search-input"
          autoComplete="off"
          placeholder="Seach for a topic"
          style={theme.mode === "Dark" ? inputStyle : {}}
        />
        <button style={theme.mode === "Dark" ? btnStyle : {}}>Search</button>
      </form>
    </section>
  );
}

export default SearchBar;
