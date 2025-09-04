// src/components/CodeForm.jsx
import { useState, useEffect } from "react";
import styles from "./CodeForm.module.css";
import { api } from "../../utils/api";

export default function CodeForm({ fetchCodes, editing, setEditing }) {
  const [uploading, setUploading] = useState(false);
  const [slug, setSlug] = useState("");
  const [code, setCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePublicId, setImagePublicId] = useState("");

  useEffect(() => {
    if (editing) {
      setSlug(editing.slug);
      setCode(editing.code);
      setImageUrl(editing.imageUrl);
    } else {
      setSlug("");
      setCode("");
      setImageUrl("");
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) {
      alert("Please wait until image upload is finished!");
      return;
    }
    console.log(imagePublicId)
    try {
      if (editing) {
        await api.put(`/code/${editing._id}`, { slug, code, imageUrl, imagePublicId });
      } else {
        await api.post("/code", { slug, code, imageUrl, imagePublicId });
      }
      fetchCodes();
      setEditing(null);
      setSlug("");
      setCode("");
      setImageUrl("");
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
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            setUploading(true);
            try {
              const res = await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              setImageUrl(res.data.url);
              setImagePublicId(res.data.public_id)
            } catch (err) {
              console.error(err);
            } finally {
              setUploading(false);
            }
          }}
        />


        <button
          className={styles["code-submit-btn"]}
          type="submit"
          disabled={uploading}
          >
          {uploading ? "Uploading..." : editing ? "Update" : "Add"} Code
        </button>
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className={styles["preview-img"]} />
          )}
      </form>
    </div>
  );
}
