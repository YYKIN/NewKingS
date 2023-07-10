import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false); // 初始登录状态为false
  const [address, setAddress] = useState(""); // 存储登录的地址账号

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        address,
        setAddress,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
