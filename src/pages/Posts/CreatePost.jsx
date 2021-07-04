import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../../components/PostForm/PostForm";
import Footer from "../../components/Footer/Footer";
import { ThemeContext } from "../../Context/ThemeContext";

const titleStyle = {
  textAlign: "center",
  marginTop: "32px",
};

function CreatePost() {
  const { theme } = useContext(ThemeContext);
  const { userId } = useParams();


  useEffect(() => {
    document.title = `What I've Learned - Create Post`
  }, [])

  return (
    <>
      <section
        className="new-post-container"
        style={{ width: "100%", maxWidth: "900px" }}
      >
        <div className="new-post-title" style={titleStyle}>
          <h1>Create Post</h1>
        </div>
        <PostForm btnText="Create" fetchUrl={`/api/v1/${userId}/post/create?_method=PATCH`} />
      </section>
      <Footer theme={theme} />
    </>
  );
}

export default CreatePost;
