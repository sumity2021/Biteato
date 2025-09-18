import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const EditFoodPartnerProfileModal = ({ id, profile, onClose, onSaved }) => {
  const [form, setForm] = useState({
    name: profile.name || "",
    contactName: profile.contactName || "",
    phone: profile.phone || "",
    email: profile.email || "",
    address: profile.address || "",
    storeUrl: profile.storeUrl || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(profile.avatarUrl || "");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      let payload;
      let headers = {};
      if (avatarFile) {
        payload = new FormData();
        Object.entries(form).forEach(([k, v]) => payload.append(k, v));
        payload.append("avatar", avatarFile);
        headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = { ...form };
        headers["Content-Type"] = "application/json";
      }
      const { data } = await axios.put(
        `${BACKEND_URL}/api/food-partner/update`,
        payload,
        { withCredentials: true, headers }
      );
      const updated = data.foodPartner || data.updated || form;
      console.log(data);
      onSaved(updated);
      toast.success("Profile updated");
      onClose();
    } catch (err) {
      console.warn("Profile update failed", err);
      toast.error("Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="pf-modal-root"
      role="dialog"
      aria-modal="true"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="pf-modal-backdrop" onClick={onClose} />
      <div className="pf-modal-panel" role="document">
        <header className="pf-modal-header">
          <h2 id={`${id}-title`} className="pf-modal-title">
            Edit profile
          </h2>
          <button
            type="button"
            className="pf-close-btn"
            onClick={onClose}
            aria-label="Close edit profile"
          >
            ✕
          </button>
        </header>
        <form className="pf-modal-form" onSubmit={handleSubmit} noValidate>
          <div className="pf-avatar-field">
            <div className="pf-avatar-preview" aria-label="Avatar preview">
              {preview ? (
                <img src={preview} alt="Avatar preview" />
              ) : (
                <div className="pf-avatar-fallback">
                  <svg
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
                </div>
              )}
            </div>
            <label className="pf-file-btn">
              Change avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatar}
                hidden
              />
            </label>
          </div>

          <div className="pf-field">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Business name"
            />
          </div>
          <div className="pf-field">
            <label>Contact Name</label>
            <input
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
          </div>
          <div className="pf-field">
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
            />
          </div>
          <div className="pf-field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="business@example.com"
            />
          </div>
          <div className="pf-field pf-field-wide">
            <label>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Market Street"
            />
          </div>
          <div className="pf-field pf-field-wide">
            <label>Store URL</label>
            <input
              name="storeUrl"
              value={form.storeUrl}
              onChange={handleChange}
              placeholder="https://yourstore.example"
            />
          </div>

          <div className="pf-actions">
            <button
              type="button"
              className="pf-btn pf-btn-ghost"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="pf-btn pf-btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoodPartnerProfileModal;
