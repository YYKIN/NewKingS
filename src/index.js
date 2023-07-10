import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import { LoginProvider } from "./LoginContext";
import "./index.css"; // 引入样式文件
import "semantic-ui-css/semantic.min.css";

import Home from "./Home";
import Mint from "./Mint";
import Login from "./Login";
import NFTUpgrade from "./NFTUpgrade";
import NoticeList from "./NoticeList";
import Notice from "./Notice";

const App = () => {
  return (
    <Router>
      <LoginProvider>
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/login" element={<Login />} />
              <Route path="/nftupgrade" element={<NFTUpgrade />} />
              <Route path="/notice" element={<NoticeList />} />
              <Route path="/notice/:noticeId" element={<Notice />} />
            </Routes>
          </div>
          <nav className="footer-nav">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/mint">Mint</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </LoginProvider>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
