import storage from "local-storage-fallback";
import React, { useEffect, useState } from "react";
import NewPost from "../NewPost/NewPost";
import { formatDate } from "../../Helper/formatTime";

import "./Recents.css";

const borderStyle = {
  border: "1.5px solid #fff",
};

function Recents({ theme }) {
  const [posts, setPosts] = useState([])
  const [postsArr, setPostsArr] = useState([])

  const setPostsData = data => {
    setPostsArr((data))
  }

  const getRecentPosts = () => {
  const userId = storage.getItem("userId")

    fetch(`/api/v1/${userId}/posts`)
    .then(res => res.json())
    .then(data => setPostsData(data.posts))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getRecentPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPosts(postsArr.reverse().slice(0, 3))
  }, [postsArr])


  return (
    <section className="recents-container">
      <div className="section-title">
        <h3>Recents</h3>
          <NewPost />
      </div>

      <div className="posts-wrapper">
        {
          posts.length <= 0 ? 
          <p>Não há posts!</p>
          :
          posts.map((element) => (
          (
          <div className="posts-container recent " key={element?._id}>
            <div className="post-title">
              <span>
                <strong>{element?.title}</strong>
              </span>
            </div>
            <div className="post-info">
              <span className="category-name">
                Categorie - <strong>{element?.category}</strong>
              </span>
              <span className="post-date">{formatDate(element?.postDate)}</span>
            </div>
            <div className="post">
              <div style={theme.mode === "Dark" ? borderStyle : {}}>
                <p>{element?.body}</p>
              </div>
            </div>
          </div>
        )
        ))
        }
      </div>
    </section>
  );
}

export default Recents;
