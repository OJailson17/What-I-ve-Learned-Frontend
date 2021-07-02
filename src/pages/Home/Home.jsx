import storage from "local-storage-fallback";
import React, { useContext, useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import Recents from "../../components/Recents/Recents";
import SearchBar from "../../components/SearchBar/SearchBar";
import { dataContext } from "../../Context";

function Home() {
  const { theme, setPageLocation, postSearched} =
    useContext(dataContext);
  const [posts, setPosts] = useState([]);
  const [postsArr, setPostsArr] = useState([]);

  const setPostsData = (data) => {
    setPostsArr(data);
  };

  const getRecentPosts = () => {
    const userId = storage.getItem("userId");

    fetch(`/api/v1/${userId}/posts`)
      .then((res) => res.json())
      .then((data) => setPostsData(data.posts))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = `What I've Learned - Home`;
    getRecentPosts();
    setPageLocation(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPosts(postsArr.reverse().slice(0, 4));
  }, [postsArr]);

  return (
    <>
    <div
      className="app"
      style={{
        minHeight: "100%",
        position: "relative",
        paddingBottom: "2.5rem",
      }}
    >
      <SearchBar theme={theme} />
      {postSearched.length > 0 ? (
        <Recents
          theme={theme}
          posts={postSearched}
          titlePage="Posts Found"
          hidden={true}
        />
      ) : (
        <Categories theme={theme} posts={posts} hidden={true} />
      )}
      <Recents theme={theme} posts={posts} titlePage="Recents" hidden={false} />
    </div>
      <Footer theme={theme} />
      </>
  );
}

export default Home;
