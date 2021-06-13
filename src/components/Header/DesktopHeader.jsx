import React, {useContext} from "react";
import Lua from "@material-ui/icons/Brightness2";
import Sol from "@material-ui/icons/Brightness4";

import "./Header.css";
import { dataContext } from "../../Context";

const iconStyle = {
  fontSize: "30px",
  cursor: "pointer",
};

function DesktopHeader({ style, theme, setTheme }) {
  const {logOut} = useContext(dataContext)
  const {authenticated} = useContext(dataContext)
  console.log(authenticated);
  
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
        <div className="header-links" hidden={!authenticated.isLogged}>
          <ul>
            <li>
              <a href="/">About</a>
            </li>
            <li onClick={logOut}>
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
