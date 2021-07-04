import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import { useStyles } from "../../Helper/changeInputColor";
import { ThemeContext } from "../../Context/ThemeContext";


import "./PostForm.css";

function PostForm({ btnText, fetchUrl, editData, deleteUrl }) {
  const { theme } = useContext(ThemeContext);
  const [postData, setPostData] = useState({
    title: "",
    category: "",
    body: "",
  });

  const classes = useStyles();
  const history = useHistory();

  const btnDarkTheme =
    theme.mode === "Dark"
      ? { background: "#0821d4" }
      : { background: "#025ceb" };

  // Handle form submit
  const handleCreatePostSubmit = (e) => {
    e.preventDefault();

    // API call to create post method on backend
    fetch(fetchUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postData.title,
        category: postData.category,
        body: postData.body,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  // Handle Delete Post
  const handleDeletePost = () => {
    fetch(deleteUrl, {
      method: "POST"
    })
    .then(res => res.json())
    .then(data => history.push("/"))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    setPostData({
      ...postData,
      title: editData?.title,
      category: editData?.category,
      body: editData?.body,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  return (
    <form className="post-form" onSubmit={handleCreatePostSubmit}>
      {/* Title Input */}
      <TextField
        type="text"
        name="title"
        className={
          theme.mode === "Dark"
            ? `${classes.root} post-form-title input`
            : "post-form-title input"
        }
        id="post-title"
        variant="outlined"
        label="Title"
        size="medium"
        autoComplete="off"
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        value={postData.title || ""}
      />

      {/* Select */}
      <FormControl
        variant="outlined"
        className={
          theme.mode === "Dark"
            ? `${classes.root} post-form-category`
            : "post-form-category"
        }
      >
        <InputLabel>Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="post-category"
          label="Category"
          name="category"
          value={postData.category || ""}
          onChange={(e) =>
            setPostData({ ...postData, category: e.target.value || "" })
          }
          required
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Programming">Programming</MenuItem>
        </Select>
      </FormControl>

      {/* Body Input */}
      <TextField
        className={
          theme.mode === "Dark"
            ? `${classes.root} post-form-body`
            : "post-form-body"
        }
        name="body"
        id="post-body"
        label="Body"
        multiline
        rows={7}
        variant="outlined"
        value={postData.body || ""}
        onChange={(e) =>
          setPostData({ ...postData, body: e.target.value || "" })
        }
      />
      <div className="buttons-form">
        <Button
          type="submit"
          className="post-form-btn"
          variant="contained"
          color="primary"
          style={btnDarkTheme}
        >
          {btnText}
        </Button>
        <Button
          className="post-form-btn"
          variant="contained"
          color="primary"
          style={{ ...btnDarkTheme, ...btnText === "Create" ? {display: "none"} : {} }}
          onClick={handleDeletePost}
        >
          Delete
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
