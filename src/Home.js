// Home.js
import React, { useState, useEffect } from "react";
import "./Home.css"; // 引入自定义样式文件
import "semantic-ui-css/semantic.min.css";
import CarouselComponent from "./Carousel";
import NoticeOne from "./NoticeOne";
import NFT from "./NFTUpgrade";
import { Link } from "react-router-dom";

const Home = () => {
  const [address, setAddress] = useState("");
  const [nftA, setNFTA] = useState(null);
  const [nftB, setNFTB] = useState(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  const handleUpgradeClick = () => {
    const nfta = localStorage.getItem("nftA");
    if (nfta) {
      setNFTA(nfta);
    }
    const nftb = localStorage.getItem("nftB");
    if (nftb) {
      setNFTB(nftb);
    }
    console.log("NFT A:", nftA);
    console.log("NFT B:", nftB);
  };

  return (
    <div className="home-container">
      <div className="announcement-image">
        <CarouselComponent />
      </div>
      <div className="announcement">
        <NoticeOne />
        <Link to="/Notice">查看更多公告</Link>
      </div>
      <div className="ranking">排名: XX</div>
      <div className="nft-selection">
        <NFT />
      </div>

      <div>
        <button className="ui primary button" onClick={handleUpgradeClick}>
          升级
        </button>
      </div>
    </div>
  );
};

export default Home;
