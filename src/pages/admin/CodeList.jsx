// src/components/CodeList.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import CodeForm from "./CodeForm";
import styles from "./CodeList.module.css";
import { api } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";

/* ---------------------------------------
   Reusable TelegramButton Component
--------------------------------------- */
function TelegramButton({ codeId, loadingId, onSend }) {
  const inputId = `file-input-${codeId}`;

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        id={inputId}
        onChange={(e) => onSend(codeId, e.target.files[0])}
      />

      {/* Trigger button */}
      <button
        className={`${styles["send-button"]} ${
          loadingId === codeId ? styles["loading"] : ""
        }`}
        disabled={loadingId === codeId}
        onClick={() => document.getElementById(inputId).click()}
      >
        {loadingId === codeId ? "Sending..." : "Telegram"}
      </button>
    </>
  );
}

/* ---------------------------------------
   Main CodeList Component
--------------------------------------- */
export default function CodeList() {
  const { logout } = useAuth();

  // State
  const [codes, setCodes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ---------------------------------------
     Fetch Codes (with pagination)
  --------------------------------------- */
  const fetchCodes = async (pageNo = 1) => {
    if (loading) return; // prevent duplicate requests
    setLoading(true);

    try {
      const res = await api.get(`/code?page=${pageNo}&limit=10`);

      setCodes((prev) =>
        pageNo === 1 ? res.data.codes : [...prev, ...res.data.codes]
      );
      setHasMore(res.data.hasMore);
      setPage(pageNo);
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------
     Delete a Code (update state directly)
  --------------------------------------- */
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this code?")) return;

    try {
      await api.delete(`/code/${_id}`);
      setCodes((prev) => prev.filter((c) => c._id !== _id)); // update locally
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  /* ---------------------------------------
     Send to Telegram (with video upload)
  --------------------------------------- */
  const handleTelegramSend = async (codeId, file) => {
    const formData = new FormData();
    if (file) formData.append("video", file);

    setLoadingId(codeId);
    try {
      const res = await api.post(`/code/${codeId}/send`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      if (res.data?.success) {
        // TODO: Replace with toast/notification later
        alert("✅ Sent to Telegram!");
      } else {
        alert("❌ Failed to send");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Failed to send");
    } finally {
      setLoadingId(null);
    }
  };

  /* ---------------------------------------
     Load first page on mount
  --------------------------------------- */
  useEffect(() => {
    fetchCodes(1);
  }, []);

  /* ---------------------------------------
     Render
  --------------------------------------- */
  return (
    <div className={styles["code-list-container"]}>
      {/* Header */}
      <div className={styles["header"]}>
        <h2 className={styles["code-list-title"]}>📋 Codes</h2>
        <button className={styles["logout-button"]} onClick={logout}>
          Logout
        </button>
      </div>

      {/* Form */}
      <CodeForm
        fetchCodes={() => fetchCodes(1)}
        editing={editing}
        setEditing={setEditing}
      />

      {/* Infinite Scroll Table */}
      <InfiniteScroll
        dataLength={codes.length}
        next={() => fetchCodes(page + 1)}
        hasMore={hasMore}
        loader={<h4 className={styles["loader"]}>Loading...</h4>}
        endMessage={<p className={styles["end-message"]}>No more codes</p>}
      >
        <table className={styles["code-table"]}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Slug</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {codes.map((code) => (
              <tr key={code._id}>
                {/* Thumbnail */}
                <td>
                  {code.imageUrl ? (
                    <img
                      src={code.imageUrl}
                      alt={code.title}
                      className={styles["table-thumb"]}
                    />
                  ) : (
                    <span className={styles["no-image"]}>No image</span>
                  )}
                </td>

                {/* Slug */}
                <td className={styles["slug-col"]}>{code.slug}</td>

                {/* Code block */}
                <td className={styles["code-col"]}>
                  <pre className={styles["code-block"]}>{code.code}</pre>
                </td>

                {/* Action buttons */}
                <td className={styles["action-buttons"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => setEditing(code)}
                  >
                    Edit
                  </button>

                  <button
                    className={styles["delete-button"]}
                    onClick={() => handleDelete(code._id)}
                  >
                    Delete
                  </button>

                  <TelegramButton
                    codeId={code._id}
                    loadingId={loadingId}
                    onSend={handleTelegramSend}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}
