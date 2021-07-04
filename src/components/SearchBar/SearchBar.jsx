/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AplicationContext } from "../../Context/ApplicationContext";

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
  const { setPostSearched, allPosts } = useContext(AplicationContext);

  const [searchInput, setSearchInput] = useState("");

  const searchPost = (event) => {
    event.preventDefault();

    const postes = allPosts.filter((post) => {
      if (post?.title.indexOf(searchInput) !== -1) {
        return post;
      } else if (post?.body.indexOf(searchInput) !== -1) {
        return post;
      }

      return null;
    });

    if (postes.length <= 0) {
      alert("No posts found!");
    }

    setPostSearched(postes);
  };

  useEffect(() => {
    if (searchInput === "") {
      setPostSearched([]);
    }
  }, [searchInput]);

  return (
    <section className="searchbar-container">
      <form className="search-form" onSubmit={searchPost}>
        <input
          type="text"
          className="search-input"
          autoComplete="off"
          placeholder="Seach for a topic"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          style={theme.mode === "Dark" ? inputStyle : {}}
        />
        <button style={theme.mode === "Dark" ? btnStyle : {}}>Search</button>
      </form>
    </section>
  );
}

export default SearchBar;
