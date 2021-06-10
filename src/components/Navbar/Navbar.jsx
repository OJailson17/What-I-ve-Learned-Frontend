import React from "react";
import logo from "../../images/logo-icon.svg";

import "./Navbar.css";

function Navbar({ widthNav, setWidthNav, theme, setTheme }) {
  const closeNav = () => {
    setWidthNav(0);
  };

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
        <button>About</button>
        <button onClick={changeTheme}>
          {theme.mode === "Dark" ? "Light" : "Dark"}
        </button>
        <button>Log out</button>
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
