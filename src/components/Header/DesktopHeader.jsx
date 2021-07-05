import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Lua from "@material-ui/icons/Brightness2";
import Sol from "@material-ui/icons/Brightness4";

import { AplicationContext } from "../../Context/ApplicationContext";
import "./Header.css";
import { AuthContext } from "../../Context/AuthContext";

const iconStyle = {
  fontSize: "30px",
  cursor: "pointer",
};

function DesktopHeader({ style, theme, setTheme }) {
  const { authenticated } = useContext(AuthContext);
  const { setLogOut, pageLocation } = useContext(AplicationContext);

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
              {pageLocation === "/about" ? (
                <Link to="/">Home</Link>
              ) : (
                <Link to="/about">About</Link>
              )}
            </li>
            <li onClick={() => setLogOut(true)} style={{ cursor: "pointer" }}>
              Log out
            </li>
            <li onClick={changeTheme} title="Change theme" aria-label="Change theme">
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
