import React from "react";
import NewPost from "../NewPost/NewPost";
import { Link } from "react-router-dom";

import "./Recents.css";

const borderStyle = {
  border: "1.5px solid #fff",
};

function Recents({ theme }) {
  const postArr = [
    {
      id: 1234,
      title: "My first post",
      body: "Some Random Text here",
      category: "English",
    },
    {
      id: 12345,
      title: "My second post",
      body: "Some Random Text here",
      category: "Programming",
    },
    {
      id: 123456,
      title: "My third post",
      body: "Some Random Text here",
      category: "English",
    },
  ];
  return (
    <section className="recents-container">
      <div className="section-title">
        <h3>Recents</h3>
          <NewPost />
      </div>

      <div className="posts-wrapper">
        {postArr.map((element) => (
          <div className="posts-container recent " key={element.id}>
            <div className="post-title">
              <span>
                <strong>{element.title}</strong>
              </span>
            </div>
            <div className="post-info">
              <span className="category-name">
                Categorie - <strong>{element.category}</strong>
              </span>
              <span className="post-date">29/05/2021 - 07:50</span>
            </div>
            <div className="post">
              <div style={theme.mode === "Dark" ? borderStyle : {}}>
                <p>{element.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Recents;
