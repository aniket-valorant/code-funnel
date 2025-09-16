// src/components/CodeList.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import CodeForm from "./CodeForm";
import styles from "./CodeList.module.css";
import { api } from "../../utils/api";

export default function CodeList() {
  const { logout } = useAuth();
  const [codes, setCodes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const fetchCodes = async () => {
    try {
      const res = await api.get("/code");
      setCodes(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this code?")) return;
    try {
      await api.delete(`/code/${_id}`);
      fetchCodes();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const handleCopy = (slug) => {
    const link = `https://hepptoblogs.vercel.app/a/${slug}/p1`;
    navigator.clipboard.writeText(link);
  };

  // ✅ new reusable function
  const handleTelegramSend = async (codeId, file) => {
    const formData = new FormData();
    if (file) {
      formData.append("video", file);
    }

    setLoadingId(codeId);
    try {
      const res = await api.post(`/code/${codeId}/send`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });
      if (res.data?.success) {
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

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div className={styles["code-list-container"]}>
      <div className={styles["header"]}>
        <h2 className={styles["code-list-title"]}>Codes</h2>
        <button className={styles["logout-button"]} onClick={logout}>
          Logout
        </button>
      </div>

      <CodeForm
        fetchCodes={fetchCodes}
        editing={editing}
        setEditing={setEditing}
      />

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
              <td>
                {code.imageUrl ? (
                  <img
                    src={code.imageUrl}
                    alt={code.title}
                    className={styles["table-thumb"]}
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td>{code.slug}</td>
              <td className={styles["code-col"]}>
                <pre className={styles["code-block"]}>{code.code}</pre>
              </td>
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

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  id={`file-input-${code._id}`}
                  onChange={(e) =>
                    handleTelegramSend(code._id, e.target.files[0])
                  }
                />

                <button
                  className={`${styles["send-button"]} ${
                    loadingId === code._id ? styles["loading"] : ""
                  }`}
                  disabled={loadingId === code._id}
                  onClick={() =>
                    document.getElementById(`file-input-${code._id}`).click()
                  }
                >
                  {loadingId === code._id ? "Sending" : "Telegram"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
