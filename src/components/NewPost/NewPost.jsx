import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const blue = "#025ceb";

const buttonStyles = {
  border: `1px solid ${blue}`,
  borderRadius: "5px",
  width: "100px",
  height: "30px",
  background: "transparent",
  fontSize: "14px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  color: `${blue}`,
};

function NewPost() {
  return (
    <Link to={"/post/create"} style={buttonStyles}>
      New Post
      <AddIcon style={{ color: `${blue}` }} />
    </Link>
  );
}

export default NewPost;
