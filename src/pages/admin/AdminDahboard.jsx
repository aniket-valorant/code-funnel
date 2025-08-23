import { useEffect, useState } from "react";
import { getAllCodes } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import './admin.css'

export default function AdminDashboard() {
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    getAllCodes(token)
      .then(setCodes)
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/admin/login");
      });
  }, [navigate]);

  return (
    <div>
      <AdminNavbar />
      <h2>All Codes</h2>
      <table>
        <thead>
          <tr>
            <th>Reel No</th>
            <th>Slug</th>
            <th>Code</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((c) => (
            <tr key={c._id}>
              <td>{c.reelNo || "-"}</td>
              <td>{c.slug}</td>
              <td>{c.code}</td>
              <td>{c.active ? "✅" : "❌"}</td>
              <td>
                <Link to={`/admin/edit/${c.slug}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
