import React, { useContext } from "react";
import {Link, useHistory} from 'react-router-dom'
import { dataContext } from "../../Context";
import logo from "../../images/logo-icon.svg";

import "./Navbar.css";

function Navbar({ widthNav, setWidthNav, theme, setTheme }) {
  const {logOut} = useContext(dataContext)

  const history = useHistory()
  
  const closeNav = () => {
    setWidthNav(0);
  };

  const gotToAboutPage = () => {
    closeNav()
    history.push("/about")
  }


  const changeTheme = (e) => {
    setTheme(theme.mode === "Dark" ? { mode: "Light" } : { mode: "Dark" });
    closeNav();
  };
  return (
    <nav style={{ width: `${widthNav}%` }}>
      <div className="close-btn" onClick={closeNav}>
        &times;
      </div>
      <div className="btn-container">
        <button onClick={gotToAboutPage}>About</button>
        <button onClick={changeTheme}>
          {theme.mode === "Dark" ? "Light" : "Dark"}
        </button>
        <button onClick={logOut}>Log out</button>
      </div>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>What I've Learned</p>
      </div>
      <div className="nav-dev-info">
        <p>Developed by Jailson de Oliveira</p>
      </div>
    </nav>
  );
}

export default Navbar;
