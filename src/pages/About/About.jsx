import React, { useContext } from "react";
import Logo from "../../images/logo-icon.svg";
import MyPhoto from '../../images/myPhoto.jpg'
import Footer from '../../components/Footer/Footer'
import {dataContext} from '../../Context/index'

import './About.css'

const titleStyle = {
  textAlign: "center",
  marginTop: "32px",
  marginBottom: "43px",
  fontSize: "22px"
};

function About() {
    const {theme} = useContext(dataContext)
    
  return (
      <>
    <section className="about-container">
      <div className="about-page-title" style={titleStyle}>
        <h1>About</h1>
      </div>
      <div className="about-details">
        <h2>About the developer</h2>
        <div className="details-content">
        <img loading="lazy" src={MyPhoto} alt="Logomarca" />
        <p>
          <strong>I’m Jailson de Oliveira</strong>, I’m 21 years old. I’m a programmer student
          and I made this application to improve my programming skills. This
          application was made for me and I really want to use it. I hope it’s
          be usefull for you because for me it’ll be.
        </p>
        </div>
      </div>

      <div className="about-details">
        <h2>About the application</h2>
        <div className="details-content">
        <img loading="lazy" src={Logo} alt="Logomarca" />
        <p>
          <strong>What I’ve Learned</strong> is an application to store posts about what you
          learn every day. You can post everything about English and Programming
          study. The subject is to motivate the student to post every day like
          on social media. The application was build using the MERN (MongoDB,
          Express, React and Node.Js) stack.
        </p>
        </div>
      </div>
    </section>
    <Footer theme={theme} />
    </>
  );
}

export default About;
