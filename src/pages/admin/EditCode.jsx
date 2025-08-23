import { useEffect, useState } from "react";
import { updateCode, getAllCodes } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import './admin.css'

export default function EditCode() {
  const { slug } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getAllCodes(token).then((codes) => {
      const code = codes.find((c) => c.slug === slug);
      if (code) setForm(code);
    });
  }, [slug]);

  if (!form) return <p>Loading...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await updateCode(token, slug, form);
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <AdminNavbar />
      <h2>Edit Code</h2>
      <form onSubmit={handleSubmit}>
        <input name="reelNo" placeholder="reelNo" value={form.reelNo || ""} onChange={handleChange} />
        <input name="slug" value={form.slug} onChange={handleChange} />
        <input name="title" value={form.title} onChange={handleChange} />
        <input name="description" value={form.description} onChange={handleChange} />
        <input name="code" value={form.code} onChange={handleChange} />
        <input name="shortenerUrl" value={form.shortenerUrl} onChange={handleChange} />
        <label>
          Active:
          <select name="active" value={form.active} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
