/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import storage from "local-storage-fallback";

// Get userId from localstorage or session storage if exists
const getLoggedInfo = () => {
  const isLogged =
    storage.getItem("isLogged") || sessionStorage.getItem("isLogged");
  return isLogged ? JSON.parse(isLogged) : { isLogged: false };
};

// Get the user preference theme, if it doesn't exist return light by default
const getInitialTheme = () => {
  const savedTheme = storage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : { mode: "Light" };
};

// Get user id from localstorage
const getUserId = () => {
  return storage.getItem("userId");
};

export const dataContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(getLoggedInfo);
  const [userInfo, setUserInfo] = useState({});
  const [theme, setTheme] = useState(getInitialTheme);
  const [userId, setUserId] = useState(userInfo?._id);
  const [allPosts, setAllPosts] = useState([]);
  const [pageLocation, setPageLocation] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  // Is used to fetch all the posts from backend API
  const findUser = () => {
    fetch(`/api/v1/user/${getUserId()}`)
      .then((res) => res.json())
      .then((data) => data.error ? logOut() : setAllPosts(data.user.posts))
      .catch((err) => console.log(err));
  };

  // Is used to log out the user, removing the userId from localstorage and setting authenticated to false
  const logOut = () => {
    storage.removeItem("token");
    setAuthenticated({ isLogged: false });
    // window.location.reload();
  };

  // Is used to set userId to localstorage or to sessionStorage
  useEffect(() => {
    if (isChecked) {
      storage.setItem("isLogged", JSON.stringify(authenticated));
    } else {
      sessionStorage.setItem("isLogged", JSON.stringify(authenticated));
    }

    // Call the function to fetch the posts data
    findUser();

    if (!authenticated.isLogged) {
      storage.removeItem("token");
      sessionStorage.removeItem("isLogged");
    }
  }, [authenticated]);

  // Check if user is logged or not trying to get userId from localstorage
  useEffect(() => {
    findUser()
    const token = storage.getItem("token") || sessionStorage.getItem("token");
    const userId = getUserId()
    if (!token || !userId) logOut()
  }, []);

  // Check the user theme preference and set to localstorage
  useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <dataContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        userInfo,
        setUserInfo,
        userId,
        setUserId,
        allPosts,
        logOut,
        theme,
        setTheme,
        pageLocation,
        setPageLocation,
        isChecked,
        setIsChecked,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
