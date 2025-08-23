import { Link, useNavigate } from "react-router-dom";
import '../pages/admin/admin.css'

export default function AdminNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <nav className="admin-navbar">
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/add">Add Code</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
