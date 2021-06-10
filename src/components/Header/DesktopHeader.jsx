import React from "react";
import Lua from "@material-ui/icons/Brightness2";
import Sol from "@material-ui/icons/Brightness4";

import "./Header.css";

const iconStyle = {
  fontSize: "30px",
  cursor: "pointer",
};

function DesktopHeader({ authenticated, style, theme, setTheme }) {
  const changeTheme = () => {
    setTheme(theme.mode === "Dark" ? { mode: "Light" } : { mode: "Dark" });
  };

  return (
    <header style={style}>
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <h1>What I've Learned</h1>
          </a>
        </div>
        <div className="header-links" hidden={!authenticated}>
          <ul>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Log out</a>
            </li>
            <li onClick={changeTheme}>
              {theme.mode === "Dark" ? (
                <Sol style={iconStyle} />
              ) : (
                <Lua style={iconStyle} />
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default DesktopHeader;
