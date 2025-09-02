// src/components/CodeForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import styles from "./CodeForm.module.css";
import { api } from "../../utils/api";

export default function CodeForm({ fetchCodes, editing, setEditing }) {
  const { token } = useAuth();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (editing) {
      setSlug(editing.slug);
      setTitle(editing.title);
      setCode(editing.code);
      setImageUrl(editing.imageUrl);
    } else {
      setSlug(""); setTitle(""); setCode(""); setImageUrl("");
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/code/${editing._id}`, 
          { slug, title, code, imageUrl }
        );
      } else {
        await api.post("/code",
          { slug, title, code, imageUrl });
      }
      fetchCodes();
      setEditing(null);
      setSlug(""); setTitle(""); setCode(""); setImageUrl("");
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <div className={styles["code-form-container"]}>
      <form className={styles["code-form"]} onSubmit={handleSubmit}>
        <input
          className={styles["code-input"]}
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
          <input
            className={styles["code-input"]}
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        <input
          className={styles["code-input"]}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={styles["code-input"]}
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className={styles["code-submit-btn"]} type="submit">
          {editing ? "Update" : "Add"} Code
        </button>
      </form>
    </div>
  );
}
