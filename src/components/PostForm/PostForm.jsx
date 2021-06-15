import React, { useContext } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import { useStyles } from "../../Helper/changeInputColor";

import "./PostForm.css";
import { dataContext } from "../../Context";

function PostForm({ btnText }) {
  const { theme } = useContext(dataContext);
  const classes = useStyles();

  return (
    <form className="post-form">
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
