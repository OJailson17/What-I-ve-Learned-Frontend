import React, { useContext, useState } from "react";
import { dataContext } from "../../Context";

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
  const [searchInput, setSearchInput] = useState('')
  const [foundPosts, setFoundPosts] = useState('')
  const {allPosts} = useContext(dataContext)
  // console.log(allPosts);

  const searchPost = (event) => {
    event.preventDefault()

    allPosts.map(post => {
      if(post?.title.indexOf(searchInput) !== -1){
        console.log(post);
      } else if (post?.body.indexOf(searchInput) !== -1) {
        console.log(post);
      }
    })
  }

  return (
    <section className="searchbar-container">
      <form className="search-form" onSubmit={searchPost}>
        <input
          type="text"
          className="search-input"
          autoComplete="off"
          placeholder="Seach for a topic"
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
          style={theme.mode === "Dark" ? inputStyle : {}}
        />
        <button style={theme.mode === "Dark" ? btnStyle : {}}>Search</button>
      </form>
    </section>
  );
}

export default SearchBar;
