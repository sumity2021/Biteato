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
        // console.log(response.data);
        setVideos(response.data.foodItems);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  async function likeVideo(item) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/food/like`,
        { foodId: item._id },
        { withCredentials: true }
      );
      // console.log(response);
      const updatedVideos = videos.map((v) =>
        v._id === item._id
          ? {
              ...v,
              likeCount: response.data.likeCount,
              likeStatus: response.data.message,
            }
          : v
      );
      setVideos(updatedVideos);
    } catch (error) {
      console.error("Error liking video:", error);
    }
  }

  async function saveVideo(item) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );
      // console.log(response);
      const updatedVideos = videos.map((v) =>
        v._id === item._id
          ? {
              ...v,
              saveCount: response.data.saveCount,
              saveStatus: response.data.message,
            }
          : v
      );
      setVideos(updatedVideos);
    } catch (error) {
      console.error("Error saving video:", error);
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
