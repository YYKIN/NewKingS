// Notice.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Notice.css";

const Notice = () => {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    fetch("https://www.newking.io/api/notice")
      .then((response) => response.json())
      .then((data) => {
        const selectedNotice = data.find(
          (item) => item.id === Number(noticeId)
        );
        setNotice(selectedNotice);
      })
      .catch((error) => console.error("Error:", error));
  }, [noticeId]);

  if (!notice) {
    return null;
  }

  const { title, content, author, thumb, publish_time } = notice;
  const thumbUrl = `https://www.newking.io/public/${thumb}`;

  // 提取并替换内容中的图片路径
  const updatedContent = content.replace(
    /<img src="\/public([^"]+)"[^>]*>/g,
    `<img src="https://www.newking.io/public$1" alt="公告图片">`
  );

  // 检查内容中是否包含图片
  const hasImage = /<img/.test(updatedContent);

  return (
    <div className="notice">
      <h2
        className="notice-title notice-title-center"
        style={{ marginTop: "20px" }}
      >
        {title}
      </h2>
      <p
        className="notice-content"
        dangerouslySetInnerHTML={{ __html: updatedContent }}
      ></p>
      <p className="notice-info">作者：{author}</p>
      <p className="notice-info">发布时间：{publish_time}</p>
      {hasImage && <img src={thumbUrl} alt="" />}
    </div>
  );
};

export default Notice;
