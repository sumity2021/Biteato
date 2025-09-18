import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/food`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);

        setVideos(response.data.foodItems);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  async function likeVideo(item) {
    const response = await axios.post(
      `${BACKEND_URL}/api/food/like`,
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.like) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v
        )
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v
        )
      );
    }
  }

  async function saveVideo(item) {
    const response = await axios.post(
      `${BACKEND_URL}/api/food/save`,
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.save) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v
        )
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v
        )
      );
    }
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  );
};

export default Home;
