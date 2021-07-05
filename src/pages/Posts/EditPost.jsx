import React, { useContext, useEffect, useState } from "react";
import PostForm from "../../components/PostForm/PostForm";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const titleStyle = {
  textAlign: "center",
  marginTop: "32px",
};

function EditPost() {
  const [postData, setPostData] = useState({});
  const { theme } = useContext(ThemeContext);
  const { userId, postId } = useParams();
  const BASE_URL = process.env.REACT_APP_API_URL


  const getPostData = () => {
    fetch(`${BASE_URL}/api/v1/${userId}/post/${postId}`)
      .then((res) => res.json())
      .then((data) => setPostData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section
        className="edit-post-container"
        style={{ width: "100%", maxWidth: "900px" }}
      >
        <div className="edit-post-title" style={titleStyle}>
          <h1>Edit Post</h1>
        </div>
        <PostForm
          btnText="Update"
          fetchUrl={`/api/v1/${userId}/post/${postId}/edit?_method=PATCH`}
          deleteUrl={`/api/v1/${userId}/post/${postId}/delete?_method=PATCH`}
          editData={postData?.post}
        />
      </section>
      <Footer theme={theme} />
    </>
  );
}

export default EditPost;
