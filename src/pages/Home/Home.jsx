import React, { useContext } from "react";
import Categories from "../../components/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import Recents from "../../components/Recents/Recents";
import SearchBar from "../../components/SearchBar/SearchBar";
import { dataContext } from "../../Context";


function Home() {
  const {theme} = useContext(dataContext)

  return (
    <div className="app">
      <SearchBar theme={theme} />
      <Categories theme={theme} />
      <Recents theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

export default Home;
