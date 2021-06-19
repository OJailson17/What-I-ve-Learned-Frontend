import storage from "local-storage-fallback";
import React, { useContext, useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import Recents from "../../components/Recents/Recents";
import SearchBar from "../../components/SearchBar/SearchBar";
import { dataContext } from "../../Context";


function Home() {
  const {theme} = useContext(dataContext)
  const [posts, setPosts] = useState([])
  const [postsArr, setPostsArr] = useState([])

  const setPostsData = data => {
    setPostsArr((data))
  }

  const getRecentPosts = () => {
  const userId = storage.getItem("userId")

    fetch(`/api/v1/${userId}/posts`)
    .then(res => res.json())
    .then(data => setPostsData(data.posts))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getRecentPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPosts(postsArr.reverse().slice(0, 4))
  }, [postsArr])

  return (
    <div className="app" style={{minHeight: "100vh", position: "relative", paddingBottom: "2.5rem"}}>
      <SearchBar theme={theme} />
      <Categories theme={theme} posts={posts}/>
      <Recents theme={theme} posts={posts}/>
      <Footer theme={theme} />
    </div>
  );
}

export default Home;
