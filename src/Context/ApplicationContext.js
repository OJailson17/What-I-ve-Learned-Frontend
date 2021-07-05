/* eslint-disable react-hooks/exhaustive-deps */
import storage from "local-storage-fallback";
import { createContext, useState } from "react";

// Get user id from localstorage
const getUserId = () => {
  return storage.getItem("userId");
};

export const AplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [pageLocation, setPageLocation] = useState("");
  const [postSearched, setPostSearched] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [logOut, setLogOut] = useState(false)
  const BASE_URL = process.env.REACT_APP_API_URL



    // Is used to fetch all the posts from backend API
    const findUser = () => {
      fetch(`${BASE_URL}/api/v1/user/${getUserId()}`)
        .then((res) => res.json())
        .then((data) => (data.error ? setLogOut(true) : setAllPosts(data.user.posts)))
        .catch((err) => console.log(err));
    };


  return (
    <AplicationContext.Provider
      value={{
        isChecked,
        setIsChecked,
        pageLocation,
        setPageLocation,
        postSearched,
        setPostSearched,
        allPosts,
        setAllPosts,
        findUser,
        setLogOut,
        logOut,
        getUserId,
        
      }}
    >
      {children}
    </AplicationContext.Provider>
  );
};
