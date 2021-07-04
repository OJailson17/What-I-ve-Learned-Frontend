import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [userId, setUserId] = useState(userInfo?._id);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        setUserInfo,
        userInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
