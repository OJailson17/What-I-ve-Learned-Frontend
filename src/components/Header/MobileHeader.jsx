import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { dataContext } from "../../Context";
import Navbar from "../Navbar/Navbar";

import "./Header.css";

function MobileHeader({ theme, setTheme }) {
  const [widthNav, setWidthNav] = useState(0);

  const { authenticated } = useContext(dataContext);
  const openNav = () => {
    setWidthNav(100);
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <h1>What I've Learned</h1>
            </Link>
          </div>
          <div
            className="burger-menu"
            hidden={!authenticated.isLogged}
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
