import { createContext, useEffect, useState } from "react";
import storage from "local-storage-fallback";

export const dataContext = createContext();

const getLoggedInfo = () => {
  const isLogged = storage.getItem("isLogged");
  return isLogged ? JSON.parse(isLogged) : { isLogged: false };
};

const getInitialTheme = () => {
  const savedTheme = storage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : { mode: "Light" };
};

const getUserId = () => {
  return storage.getItem("userId")
}



export const ApplicationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(getLoggedInfo);
  const [userInfo, setUserInfo] = useState({});
  const [theme, setTheme] = useState(getInitialTheme);
  const [userId, setUserId] = useState(userInfo?._id)
  const [allPosts, setAllPosts] = useState([])
  const [pageLocation, setPageLocation] = useState("")

  
  
  const findUser = () => {
    fetch(`/api/v1/user/${getUserId()}`)
    .then(res => res.json())
    .then(data => setAllPosts(data.user.posts))
    .catch(err => console.log(err))
  }

  const logOut = () => {
    storage.removeItem("token");
    setAuthenticated({ isLogged: false });
    window.location.reload();
  };

  useEffect(() => {
    storage.setItem("isLogged", JSON.stringify(authenticated));
    findUser()
  }, [authenticated]);

  useEffect(() => {
    const token = storage.getItem("token");
    if (!token) setAuthenticated({ isLogged: false });
  }, []);

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
        setPageLocation
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
