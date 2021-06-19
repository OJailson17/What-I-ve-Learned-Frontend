import React from 'react'
import { formatDate } from '../../Helper/formatTime';

import "./Post.css"

const borderStyle = {
    border: "1.5px solid #fff",
  };

function Post({posts, theme }) {
    return (
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
    )
}

export default Post
