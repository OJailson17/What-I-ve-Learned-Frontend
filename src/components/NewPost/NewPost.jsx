import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import storage from "local-storage-fallback";

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

const getUserId = () => {
  return storage.getItem("userId");
};

function NewPost({hidden}) {
  return (
    <Link to={`${getUserId()}/post/create`} style={hidden ? {...buttonStyles, display: "none"} : buttonStyles}>
      New Post
      <AddIcon style={{ color: `${blue}` }} />
    </Link>
  );
}

export default NewPost;
