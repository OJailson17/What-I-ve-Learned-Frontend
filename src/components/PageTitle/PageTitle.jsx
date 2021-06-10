import React from "react";
import { Avatar } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

import "./PageTitle.css";

const avatarStyle = {
  width: "50px",
  height: "50px",
};

function PageTitle({ title }) {
  return (
    <section className="page-title">
      <Avatar style={avatarStyle}>
        <LockIcon />
      </Avatar>
      <span>{title}</span>
    </section>
  );
}

export default PageTitle;
