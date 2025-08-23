import { useState } from "react";
import { createCode } from "../../api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import './admin.css'

export default function AddCode() {
  const [form, setForm] = useState({
    reelNo: "",
    slug: "",
    title: "",
    description: "",
    code: "",
    shortenerUrl: "",
    active: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await createCode(token, form);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Error adding code");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h2>Add Code</h2>
      <form onSubmit={handleSubmit}>
        <input name="reelNo" placeholder="Reel No" onChange={handleChange} />
        <input name="slug" placeholder="Slug" onChange={handleChange} />
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="code" placeholder="Code" onChange={handleChange} />
        <input name="shortenerUrl" placeholder="Shortener URL" onChange={handleChange} />
        <label>
          Active:
          <select name="active" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
