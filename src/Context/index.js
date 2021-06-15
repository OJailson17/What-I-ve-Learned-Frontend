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

export const ApplicationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(getLoggedInfo);
  const [userInfo, setUserData] = useState({});
  const [theme, setTheme] = useState(getInitialTheme);

  const logOut = () => {
    storage.removeItem("token");
    setAuthenticated({ isLogged: false });
    window.location.reload();
  };

  useEffect(() => {
    storage.setItem("isLogged", JSON.stringify(authenticated));
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
        setUserData,
        logOut,
        theme,
        setTheme,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
