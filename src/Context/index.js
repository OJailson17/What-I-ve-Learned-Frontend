import { createContext, useEffect, useState } from "react";
import storage from "local-storage-fallback";
import { useHistory } from "react-router-dom";

export const dataContext = createContext();

const getLoggedInfo = () => {
  const isLogged = storage.getItem("isLogged");
  return isLogged ? JSON.parse(isLogged) : { isLogged: false };
};

export const ApplicationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(getLoggedInfo);
  const [userInfo, setUserData] = useState({});
  
  // const history = useHistory()
  const logOut = () => {
    storage.removeItem("token")
    setAuthenticated({isLogged: false})
    window.location.reload()
    // history.push("/login")
  }

  useEffect(() => {
    storage.setItem("isLogged", JSON.stringify(authenticated));
  }, [authenticated]);

  useEffect(() => {
    const token = storage.getItem("token");
    if (!token) setAuthenticated({ isLogged: false });
  }, []);



  return (
    <dataContext.Provider
      value={{ authenticated, setAuthenticated, userInfo, setUserData, logOut }}
    >
      {children}
    </dataContext.Provider>
  );
};
