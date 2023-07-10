import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NoticeList.css";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("https://www.newking.io/api/notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /* 请求体参数 */
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedNotices = data.sort((a, b) => {
          // 根据发布时间降序排序
          return new Date(b.publish_time) - new Date(a.publish_time);
        });
        setNotices(sortedNotices);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="notice-container">
      <div className="notice-title-container">
        <h2 className="notice-title">公告列表</h2>
        <hr className="notice-divider" />
      </div>
      <div className="notice-list">
        {notices.reverse().map((notice) => (
          <Link
            to={`/notice/${notice.id}`}
            className="notice-link"
            key={notice.id}
          >
            <p className="notice-item">
              [{new Date(notice.publish_time).toLocaleDateString()}]{" "}
              {notice.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NoticeList;
