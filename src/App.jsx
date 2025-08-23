import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import WaitPage from "./pages/WaitPage.jsx";
import FinalPage from "./pages/FinalPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDahboard.jsx";
import AddCode from "./pages/admin/AddCode.jsx";
import EditCode from "./pages/admin/EditCode.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx";


import "./styles.css";
import './pages/admin/admin.css'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          {/* canonical flow */}
          <Route path="/c/:slug" element={<LandingPage />} />
          <Route path="/c/:slug/wait" element={<WaitPage />} />
          <Route path="/c/:slug/final" element={<FinalPage />} />

          <Route path="/" element={<Navigate to="/c/demo" replace />} />


          {/* admin panel */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <ProtectedRoute>
                <AddCode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit/:slug"
            element={
              <ProtectedRoute>
                <EditCode />
              </ProtectedRoute>
            }
          />

          {/* convenience: redirect root */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
