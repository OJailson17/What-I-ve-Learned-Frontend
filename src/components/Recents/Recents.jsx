import React from "react";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";

import "./Recents.css";

function Recents({ theme, posts, titlePage, hidden }) {
  return (
    <section className="recents-container">
      <div className="section-title">
        <h3>{titlePage}</h3>
        <NewPost hidden={hidden} />
      </div>

      <div className="posts-wrapper">
        {posts.length <= 0 ? (
          <p>Não há posts!</p>
        ) : (
          <Post posts={posts} theme={theme} />
        )}
      </div>
    </section>
  );
}

export default Recents;
