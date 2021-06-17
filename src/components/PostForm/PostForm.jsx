import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import { useStyles } from "../../Helper/changeInputColor";

import { dataContext } from "../../Context";

import "./PostForm.css";

function PostForm({ btnText }) {
  const { theme } = useContext(dataContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const classes = useStyles();
  const { userId } = useParams();
  const history = useHistory();

  // Handle form submit
  const handleCreatePostSubmit = (e) => {
    e.preventDefault();

    // API call to create post method on backend
    fetch(`/api/v1/${userId}/post/create?_method=PATCH`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category, body }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button
        type="submit"
        className="post-form-btn"
        variant="contained"
        color="primary"
        style={
          theme.mode === "Dark"
            ? { background: "#0821d4" }
            : { background: "#025ceb" }
        }
      >
        {btnText}
      </Button>
    </form>
  );
}

export default PostForm;
