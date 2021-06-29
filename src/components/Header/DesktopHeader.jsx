import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Lua from "@material-ui/icons/Brightness2";
import Sol from "@material-ui/icons/Brightness4";

import { dataContext } from "../../Context";
import "./Header.css";

const iconStyle = {
  fontSize: "30px",
  cursor: "pointer",
};

function DesktopHeader({ style, theme, setTheme }) {
  const { logOut } = useContext(dataContext);
  const { authenticated, pageLocation } = useContext(dataContext);


  const changeTheme = () => {
    setTheme(theme.mode === "Dark" ? { mode: "Light" } : { mode: "Dark" });
  };

  return (
    <header style={style}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>What I've Learned</h1>
          </Link>
        </div>
        <div className="header-links" hidden={!authenticated.isLogged}>
          <ul>
            <li>
              {pageLocation === "/about" ? <Link to="/">Home</Link> : <Link to="/about">About</Link>}
            </li>
            <li onClick={logOut} style={{ cursor: "pointer" }}>
              Log out
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
