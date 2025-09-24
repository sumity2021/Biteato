import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditFoodPartnerProfileModal from "../../components/EditFoodPartnerProfileModal";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Profile = ({ role }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/food-partner/${id}`,
          { withCredentials: true }
        );
        if (cancelled) return;
        const fp = data.foodPartner || {};
        setProfile(fp);
        setItems(fp.foodItems || []);
        // console.log(data);
      } catch (e) {
        if (!cancelled) console.warn("Profile fetch failed", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const totalLikes = items.reduce((acc, it) => acc + it.likeCount, 0);
  const totalSaves = items.reduce((acc, it) => acc + it.saveCount, 0);
  return (
    <main className="profile-page minimal">
      {/* HERO */}
      <section className="profile-hero" aria-label="Partner information">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-meta">
            <div className="avatar-name-row">
              <div className="avatar-shell" aria-hidden="true">
                {profile && profile.avatarUrl ? (
                  <img
                    className="avatar-img"
                    src={profile.avatarUrl}
                    alt={`${profile.name || "Avatar"}`}
                    loading="lazy"
                    onError={(e) => {
                      // hide broken image and let the SVG fallback be shown
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <svg
                    className="avatar-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
                  </svg>
                )}
              </div>
              <h1 className="hero-name" title="Business name">
                {profile ? profile.name || "Unknown" : "Loading…"}
              </h1>
            </div>
            {profile && (
              <div className="hero-tags">
                {profile.contactName && (
                  <span className="pill" title="Contact person">
                    <svg
                      className="pill-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
                    </svg>
                    {profile.contactName}
                  </span>
                )}
                {profile.phone && (
                  <span className="pill" title="Phone">
                    <svg
                      className="pill-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.37 1.69.72 2.47a2 2 0 0 1-.45 2.18L8 10a16 16 0 0 0 6 6l1.63-1.33a2 2 0 0 1 2.18-.45 11.7 11.7 0 0 0 2.47.72A2 2 0 0 1 22 16.92Z" />
                    </svg>
                    {profile.phone}
                  </span>
                )}
                {profile.email && (
                  <span className="pill truncate" title="Email">
                    <svg
                      className="pill-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="m4 6 8 6 8-6" />
                    </svg>
                    {profile.email}
                  </span>
                )}
                {profile.address && (
                  <span className="pill truncate" title={profile.address}>
                    <svg
                      className="pill-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 21s-6-5.5-6-10a6 6 0 1 1 12 0c0 4.5-6 10-6 10Z" />
                      <circle cx="12" cy="11" r="2.5" />
                    </svg>
                    {profile.address}
                  </span>
                )}
                {profile.storeUrl && (
                  <span className="pill store-url-pill" title="Store URL">
                    <a
                      className="pill-link truncate"
                      href={profile.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.storeUrl}
                    </a>
                  </span>
                )}
              </div>
            )}
            <div className="hero-stats compact">
              <div className="stat ">
                <span className="stat-num">{items.length}</span>
                <span className="stat-label">
                  {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>
              <div className="stat ">
                <span className="stat-num">{totalLikes}</span>
                <span className="stat-label">Likes</span>
              </div>
              <div className="stat ">
                <span className="stat-num">{totalSaves}</span>
                <span className="stat-label">Saves</span>
              </div>
              {role === "partner" && (
                <button
                  type="button"
                  className="edit-trigger-btn"
                  onClick={() => setEditing(true)}
                  aria-haspopup="dialog"
                  aria-controls="edit-partner-profile-modal"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18.375 2.625a1.9 1.9 0 0 1 2.688 2.688L13 13l-4 1 1-4 8.375-8.375Z" />
                    <path d="M11 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GRID / EMPTY */}
      {!profile ? (
        <p className="simple-loading" aria-live="polite">
          Loading items…
        </p>
      ) : (
        <section
          className="profile-grid simple"
          aria-label="Food items"
          data-empty={items.length === 0 || undefined}
        >
          {items.length === 0 && (
            <div className="empty-state">
              <div className="empty-illustration" aria-hidden="true">
                🍽️
              </div>
              <p>No items yet.</p>
            </div>
          )}
          {items.map((v) => {
            return (
              <article key={v.id || v._id} className="grid-item">
                <div className="media-wrap">
                  <video
                    className="media"
                    src={v.video}
                    playsInline
                    muted
                    preload="metadata"
                    tabIndex={0}
                    onMouseEnter={(e) => {
                      try {
                        e.currentTarget.currentTime = 0;
                        e.currentTarget.play();
                      } catch {}
                    }}
                    onFocus={(e) => {
                      try {
                        e.currentTarget.currentTime = 0;
                        e.currentTarget.play();
                      } catch {}
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  {role === "partner" && (
                    <button
                      type="button"
                      className="delete-item-btn"
                      onClick={async () => {
                        try {
                          await axios.delete(
                            `${BACKEND_URL}/api/food/${v._id}`,
                            { withCredentials: true }
                          );
                          setItems((prev) =>
                            prev.filter((item) => item._id !== v._id)
                          );
                          toast.success("Item deleted");
                        } catch (error) {
                          console.error("Error deleting item:", error);
                        }
                      }}
                      aria-label="Delete item"
                      title="Delete this item"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}
      {editing && profile && (
        <EditFoodPartnerProfileModal
          id="edit-partner-profile-modal"
          profile={profile}
          onClose={() => setEditing(false)}
          onSaved={(updated) => {
            setProfile(updated);
            setEditing(false);
          }}
        />
      )}
    </main>
  );
};

export default Profile;
