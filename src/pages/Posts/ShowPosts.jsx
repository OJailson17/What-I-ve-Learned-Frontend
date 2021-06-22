/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataContext } from "../../Context";
import { TextField } from "@material-ui/core";
import Post from "../../components/Post/Post";
import Footer from "../../components/Footer/Footer";
import { useStyles } from "../../Helper/changeInputColor";
// import NewPost from '../../components/NewPost/NewPost'

import "./ShowPosts.css";
import { formatDate } from "../../Helper/formatTime";

function CategoryPost() {
  const { category } = useParams();
  const { allPosts, theme } = useContext(dataContext);
  const [posts, setPosts] = useState([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [bodySearch, setBodySearch] = useState("");

  const classes = useStyles();

  useEffect(() => {
    document.title = `What I've Learned - ${category}`
  }, [])

  useEffect(() => {
    setPosts(allPosts.filter((post) => post.category === category).reverse());
  }, [allPosts]);

  useEffect(() => {
    titleSearch === ""
      ? setPosts(
          allPosts.filter((post) => post.category === category).reverse()
        )
      : setPosts(
          posts.filter((post) => post.title.indexOf(titleSearch) !== -1)
        );
  }, [titleSearch]);

  useEffect(() => {
    dateSearch === ""
      ? setPosts(
          allPosts.filter((post) => post.category === category).reverse()
        )
      : setPosts(
          posts.filter((post) => formatDate(post.postDate).indexOf(dateSearch) !== -1)
        );
  }, [dateSearch]);

  useEffect(() => {
    bodySearch === ""
      ? setPosts(
          allPosts.filter((post) => post.category === category).reverse()
        )
      : setPosts(
          posts.filter((post) => post.body.indexOf(bodySearch) !== -1)
        );
  }, [bodySearch]);

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
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
            />
            <TextField
              label="search date/hour"
              variant="standard"
              className={
                theme.mode === "Dark"
                  ? `${classes.root} search-date category-input`
                  : "search-date category-input"
              }
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
            />
            <TextField
              label="search text"
              variant="standard"
              className={
                theme.mode === "Dark"
                  ? `${classes.root} search-body category-input`
                  : "search-body category-input"
              }
              value={bodySearch}
              onChange={(e) => setBodySearch(e.target.value)}
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
