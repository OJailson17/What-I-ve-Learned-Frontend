import React from "react";
import { Link } from "react-router-dom";
import englishImage from "../../images/english-image.jpg";
import programmingImage from "../../images/programming.jpeg";

import "./Categories.css";

const linkStyles = {
  color: "white",
};

function Categories({ theme }) {
  return (
    <section className="categories-container">
      <div className="section-title">
        <h3>Categories</h3>
      </div>
      <div className="categories-wrapper">
        <Link to={"/posts/English"} style={theme.mode === "Dark" ? linkStyles : {}}>
          <div className="english-categorie category">
            <span>English</span>
            <img loading="lazy" src={englishImage} alt="" />
          </div>
        </Link>

        <Link to={"/posts/Programming"} style={theme.mode === "Dark" ? linkStyles : {}}>
          <div className="programming-categorie category">
            <span>Programming</span>
            <img loading="lazy" src={programmingImage} alt="" />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Categories;
