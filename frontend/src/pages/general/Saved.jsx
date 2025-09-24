import React, { useEffect, useState } from "react";
import "../../styles/reels.css";
import axios from "axios";
import ReelFeed from "../../components/ReelFeed";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/food/save`, {
        withCredentials: true,
      })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item._id,
          video: item.video,
          description: item.description,
          likeCount: item.likeCount,
          saveCount: item.saveCount,
          commentCount: item.commentCount,
          foodPartner: item.foodPartner,
        }));
        setVideos(savedFoods);
      });
  }, []);

  const removeSaved = async (item) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );
      setVideos((prev) => prev.filter((v) => v._id !== item._id));
    } catch {
      console.error("Error removing saved video");
    }
  };

  return (
    <ReelFeed
      items={videos}
      onSave={removeSaved}
      emptyMessage="No saved videos yet."
    />
  );
};

export default Saved;
