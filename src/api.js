import axios from "axios";
import { API_BASE_URL } from "./config";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

export async function sendContactMessage(formData) {
  const { data } = await api.post("/contact", formData);
  return data;
}

export async function getCodeMeta(slug) {
  const { data } = await api.get(`/codes/${slug}`);
  return data;
}

export async function revealCode(slug) {
  const { data } = await api.post(`/codes/${slug}/reveal`);
  return data;
}

export async function adminLogin(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { token: "..." }
}

// 🗂️ Get all codes
export async function getAllCodes(token) {
  const { data } = await api.get("/codes", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
}

// ➕ Create new code
export async function createCode(token, codeData) {
  const { data } = await api.post("/codes", codeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
}

// ✏️ Update existing code (optional)
export async function updateCode(token, slug, codeData) {
  const { data } = await api.put(`/codes/${slug}`, codeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
}