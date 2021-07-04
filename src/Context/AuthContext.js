/* eslint-disable react-hooks/exhaustive-deps */
import storage from "local-storage-fallback";
import { createContext, useContext, useEffect, useState } from "react";
import { AplicationContext } from "./ApplicationContext";

// Get userId from localstorage or session storage if exists
const getLoggedInfo = () => {
  const isLogged =
    storage.getItem("isLogged") || sessionStorage.getItem("isLogged");
  return isLogged ? JSON.parse(isLogged) : { isLogged: false };
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const { findUser } = useContext(UserContext);
  const { isChecked, getUserId, logOut, setLogOut, findUser } =
    useContext(AplicationContext);

  const [authenticated, setAuthenticated] = useState(getLoggedInfo);

  // Check if user is logged or not trying to get userId from localstorage
  useEffect(() => {
    findUser();
    const token = storage.getItem("token") || sessionStorage.getItem("token");
    const userId = getUserId();
    if (!token || !userId) {
      setLogOut(true);
    } else {
      setLogOut(false);
    }
  }, []);

  // Is used to set userId to localstorage or to sessionStorage
  useEffect(() => {
    if (isChecked) {
      storage.setItem("isLogged", JSON.stringify(authenticated));
    } else {
      sessionStorage.setItem("isLogged", JSON.stringify(authenticated));
    }

    findUser(); // Call the function to fetch the posts data

    if (!authenticated.isLogged) {
      storage.removeItem("token");
      sessionStorage.removeItem("isLogged");
    }
  }, [authenticated]);

  // Is used to log out the user, removing the userId from localstorage and setting authenticated to false
  useEffect(() => {
    if (logOut) {
      storage.removeItem("token");
      setAuthenticated({ isLogged: false });
    }
  }, [logOut]);
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
