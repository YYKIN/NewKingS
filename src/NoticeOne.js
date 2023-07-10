import React, { useEffect, useState } from "react";

const NoticeOne = () => {
  const [latestNotice, setLatestNotice] = useState("");

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
        const latestTitle = sortedNotices[0]?.title || "";
        setLatestNotice(latestTitle);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="notice-one">
      <div className="notice-one-title">最新公告：{latestNotice}</div>
    </div>
  );
};

export default NoticeOne;
