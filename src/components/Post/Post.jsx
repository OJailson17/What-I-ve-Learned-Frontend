import { Link } from 'react-router-dom'
import React from 'react'
import { formatDate } from '../../Helper/formatTime';

import "./Post.css"
import storage from 'local-storage-fallback';

const borderStyle = {
    border: "1.5px solid #fff",
  };

  const getUserId = () => {
  return storage.getItem("userId")
}

function Post({posts, theme }) {  
  
    return (
        posts.map((element) => (
            (
              <div className="posts-container recent " key={element?._id}>
              <Link to={`/${getUserId()}/post/${element?._id}/edit/`} style={theme.mode === "Dark" ? {color: "white"} : {color: "black"}}>
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
            </Link>
            </div>
          )
          ))
    )
}

export default Post
