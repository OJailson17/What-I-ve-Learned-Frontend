import React from "react";

import "./Footer.css";

function Footer({ theme }) {
  const footerDarkStyle = {
    backgroundColor: "#0821d4",
  };

  return (
    <footer style={theme.mode === "Dark" ? footerDarkStyle : {}}>
      <div className="social-media-container">
        <div className="social-media">
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/jaylson.deoliveira">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
        <div className="social-media">
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/jaylsonolliveira/">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="social-media">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/OJailson17">
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div className="social-media">
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jailson-de-oliveira-674951212/">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      <p>
        Developed by{" "}
        <a className="developer-name" href="https://github.com/OJailson17">
          Jailson de Oliveira
        </a>
      </p>
    </footer>
  );
}

export default Footer;
