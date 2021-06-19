import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataContext } from "../../Context";
import { TextField } from "@material-ui/core";
import Post from "../../components/Post/Post";
import Footer from "../../components/Footer/Footer";
import { useStyles } from "../../Helper/changeInputColor";
import NewPost from '../../components/NewPost/NewPost'

import "./ShowPosts.css";

function CategoryPost() {
  const { category } = useParams();
  const { allPosts, theme } = useContext(dataContext);
  const [post, setPosts] = useState()

  const posts = allPosts.filter(post => post.category === category)

  useEffect(() => {
    setPosts(allPosts.reverse())
  }, [allPosts])

  const classes = useStyles();
  return (
    <>
      <div className="category-posts-container">
        <div className="category-title">
          <h1>{category} Posts</h1>
        </div>
        <div className="filter-bar-container">
          <span>Filter</span>
          <div className="filter-inputs-container">
            <TextField
              label="search title"
              variant="standard"
              className={
                theme.mode === "Dark"
                  ? `${classes.root} search-title category-input`
                  : "search-title category-input"
              }
            />
            <TextField
              label="search date"
              variant="standard"
              className={
                theme.mode === "Dark"
                  ? `${classes.root} search-date category-input`
                  : "search-date category-input"
              }
            />
            <TextField
              label="search hour"
              variant="standard"
              className={
                theme.mode === "Dark"
                  ? `${classes.root} search-hour category-input`
                  : "search-hour category-input"
              }
            />
          </div>
        </div>
        <div className="posts-wrapper posts-wrapper-container">
          <Post posts={posts} theme={theme} />
        </div>
      </div>
      <Footer theme={theme} />
    </>
  );
}

export default CategoryPost;
