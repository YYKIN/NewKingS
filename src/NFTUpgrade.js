import React, { useEffect, useState } from "react";
import "./NFTUpgrade.css";
import { ethers } from "ethers";

const contractAddress = "0x080E1038815fD136946EEEEc9C99EE63F3EFd212";
const contractABI = [
];

const NFTUpgrade = () => {
  const [address, setAddress] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [nftData, setNFTData] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [nftA, setNFTA] = useState(null);
  const [nftB, setNFTB] = useState(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      setAddress(savedAddress);
    }
    // 创建以太坊提供者（可以是 MetaMask 提供的 provider 或其他以太坊节点的提供者）
    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = new ethers.JsonRpcProvider(
      "https://rpc.ankr.com/polygon_mumbai/315eac2e4a8edc98f415512919e5e40f58e888f3c5654eefd3cd3a0f28dba933"
    );
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const fetchData = async () => {
      try {
        if (address) {
          const data = [];
          // 调用合约方法
          for (let i = 0; i < 21; i++) {
            const result = await contractInstance.getTokenBalance(address, i);
            const resultString = result.toString(); // 将结果转换为字符串
            if (result > 0) {
              const extractedNumber = resultString.match(/\d+/)[0];
              for (let j = 1; j <= extractedNumber; j++) {
                data.push({ i, j });
              }
            }
            console.log("Contract Data:", result);
          }
          setNFTData(data);
        }
      } catch (error) {
        console.error("发生错误:", error);
      }
    };
    fetchData();
  }, [address]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNFTClick = (index) => {
    setSelectedNFT(index);
    const selectedNFTData = nftData[index];
    if (selectedNFTData) {
      const imageUrl = `https://www.newking.io/api/image/${selectedNFTData.i}.png`;
      if (selectedNFT === 0) {
        setNFTA(imageUrl);
        localStorage.setItem("nftA", JSON.stringify(selectedNFTData.i));
        console.log("nftA:", selectedNFTData.i);
      } else if (selectedNFT === 1) {
        setNFTB(imageUrl);
        localStorage.setItem("nftB", JSON.stringify(selectedNFTData.i));
        console.log("nftB:", selectedNFTData.i);
      }
    }
  };

  return (
    <div className="nft-container">
      {isModalOpen && (
        <div className="nft-modal">
          <div className="modal-content">
            <div className="nft-info">
              {nftData.length > 0 ? (
                nftData.map((item, index) => (
                  <img
                    key={index}
                    src={`https://www.newking.io/api/image/${item.i}.png`}
                    alt={item.extractedNumber}
                    className={selectedNFT === index ? "selected" : ""}
                    onClick={() => handleNFTClick(index)}
                  />
                ))
              ) : (
                <p>加载中...</p>
              )}
            </div>
            <button className="close-button" onClick={handleCloseModal}>
              关闭
            </button>
          </div>
        </div>
      )}

      <div className="nft-selection">
        <div className="nft-item-container">
          <div className="nft-item" onClick={handleOpenModal}>
            NFT A
          </div>
          {nftA && <img src={nftA} alt="NFT A" className="nft-image" />}
        </div>
        <div className="nft-item-container">
          <div className="nft-item" onClick={handleOpenModal}>
            NFT B
          </div>
          {nftB && <img src={nftB} alt="NFT B" className="nft-image" />}
        </div>
      </div>
    </div>
  );
};

export default NFTUpgrade;
