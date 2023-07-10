import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "./LoginContext";
import "./Login.css"; // 引入样式文件

const Login = () => {
  const { isLoggedIn, login, logout, address, setAddress } =
    useContext(LoginContext);

  // 在组件加载时检查本地存储中是否有用户的地址
  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      setAddress(savedAddress);
      login(); // 设置登录状态为已登录
    }
  }, []);

  const handleMetamaskLogin = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask to use this feature.");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [{ chainId: "0x13881" }], // Polygon网络的chainId为0x89
    });
    setAddress(accounts[0]);
    login(); // 设置登录状态为已登录
    // 发送POST请求到后端
    fetch("https://www.newking.io/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: accounts[0] }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // 将用户的地址保存在本地存储中
        localStorage.setItem("address", accounts[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleTokenPocketLogin = async () => {
    if (typeof window.tokenpocket === "undefined") {
      alert("Please install TokenPocket to use this feature.");
      return;
    }

    const accounts = await window.tokenpocket.getAccounts();

    setAddress(accounts[0]);
    login(); // 设置登录状态为已登录
  };

  const handleLogout = () => {
    setAddress("");
    logout(); // 设置为未登录状态
    localStorage.removeItem("address"); // 移除本地存储中的地址
  };

  const formatAddress = (address) => {
    if (address.length < 9) return address; // 如果地址长度小于9，直接返回原始地址
    const prefix = address.substring(0, 5); // 获取前5位
    const suffix = address.substring(address.length - 4); // 获取后4位
    const ellipsis = "***"; // 省略号
    return `${prefix}${ellipsis}${suffix}`;
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <div>
          <h2>Login</h2>
          <div className="button-container">
            <button onClick={handleMetamaskLogin}>Login with MetaMask</button>
            <button onClick={handleTokenPocketLogin}>
              Login with TokenPocket
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="logged-in">Logged in as</h2>
          <h2 className="address">{formatAddress(address)}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
