import React, { useEffect, useState } from "react";
import "../styles/comment-box.css";
import axios from "axios";

const CommentBox = ({
  visible = false,
  item = null,
  onClose = () => {},
  onAddComment = () => {},
}) => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!visible) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/food/comment/${item._id}`,
          { withCredentials: true }
        );
        setComments(res.data.comments);
        console.log(res.data.comments);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComments();
    setValue("");
  }, [visible, item, comments.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const addComment = async (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/food/comment/${item._id}`,
        { text },
        { withCredentials: true }
      );

      const newComment = res.data.comment;
      setComments((c) => [newComment, ...c]);
      setValue("");
      try {
        onAddComment(item._id);
      } catch (err) {}
    } catch (err) {
      console.error("Failed to post comment", err);
    }
    item;
  };

  if (!visible) return null;

  return (
    <aside
      className="comment-box"
      role="dialog"
      aria-label="Comments"
      aria-modal="false"
    >
      <div className="comment-box-header">
        <div className="comment-box-title">
          <strong>Comments</strong>
        </div>
        <button
          className="comment-box-close"
          onClick={onClose}
          aria-label="Close comments"
        >
          ×
        </button>
      </div>

      <form className="comment-box-input-wrap" onSubmit={addComment}>
        <input
          className="comment-box-input"
          placeholder="Write a comment..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Add a comment"
        />
        <button
          className="comment-box-send"
          type="submit"
          aria-label="Send comment"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>

      <div className="comment-box-list" role="list">
        {comments.length === 0 ? (
          <div className="comment-box-empty">
            No comments yet — be the first!
          </div>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="comment-box-item" role="listitem">
              <div className="comment-box-item-meta">
                <span className="comment-author">{c.user.fullName}</span>
                <span className="comment-time">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="comment-text">{c.text}</div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default CommentBox;
