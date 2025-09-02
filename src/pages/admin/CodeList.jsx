// src/components/CodeList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import CodeForm from "./CodeForm";
import styles from "./CodeList.module.css";
import { api } from "../../utils/api";

export default function CodeList() {
  const { token, logout } = useAuth();  // ✅ get logout
  const [codes, setCodes] = useState([]);
  const [editing, setEditing] = useState(null);

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

      <CodeForm fetchCodes={fetchCodes} editing={editing} setEditing={setEditing} />

      <table className={styles["code-table"]}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr key={code._id}>
              <td>{code.title}</td>
              <td>{code.slug}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
