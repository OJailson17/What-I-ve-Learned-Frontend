import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

import "./Header.css";

function MobileHeader({ authenticated, theme, setTheme }) {
  const [widthNav, setWidthNav] = useState(0);

  const openNav = () => {
    setWidthNav(100);
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="/">
              <h1>What I've Learned</h1>
            </a>
          </div>
          <div
            className="burger-menu"
            hidden={!authenticated}
            onClick={openNav}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <Navbar
          widthNav={widthNav}
          setWidthNav={setWidthNav}
          theme={theme}
          setTheme={setTheme}
        />
      </header>
    </>
  );
}

export default MobileHeader;
