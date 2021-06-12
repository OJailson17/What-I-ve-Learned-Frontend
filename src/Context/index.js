import { createContext, useEffect, useState } from "react";
import storage from "local-storage-fallback";

export const dataContext = createContext();

const getLoggedInfo = () => {
  const isLogged = storage.getItem("isLogged");
  return isLogged ? JSON.parse(isLogged) : { isLogged: false };
};

export const ApplicationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(getLoggedInfo);
  const [userInfo, setUserData] = useState({});

  useEffect(() => {
    storage.setItem("isLogged", JSON.stringify(authenticated));
  }, [authenticated]);

  useEffect(() => {
    const token = storage.getItem("token");
    if (!token) setAuthenticated({ isLogged: false });
  }, []);

  return (
    <dataContext.Provider
      value={{ authenticated, setAuthenticated, userInfo, setUserData }}
    >
      {children}
    </dataContext.Provider>
  );
};
