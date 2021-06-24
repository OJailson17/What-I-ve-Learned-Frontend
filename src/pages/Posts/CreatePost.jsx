import React, { useContext, useEffect } from "react";
import PostForm from "../../components/PostForm/PostForm";
import Footer from "../../components/Footer/Footer";
import { dataContext } from "../../Context";
import { useParams } from "react-router-dom";

const titleStyle = {
  textAlign: "center",
  marginTop: "32px",
};

function CreatePost() {
  const { theme } = useContext(dataContext);
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
