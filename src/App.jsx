import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.js";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/web/home/Home.jsx";
import Blog from "./pages/web/blog/Blog.jsx";
import Post from "./pages/web/post/Post.jsx";
import About from "./pages/web/about/About.jsx";
import Contact from "./pages/web/contact/Contact.jsx";
import Privacy from "./pages/web/privacy/Privacy.jsx";
import Terms from "./pages/web/terms/Terms.jsx";
import PostPage from "./components/postPage/PostPage.jsx";
import Page1 from "./pages/adPages/Page1.jsx";
import Page2 from "./pages/adPages/Page2.jsx";
import Page3 from "./pages/adPages/Page3.jsx";
import { PageProgressProvider } from "./context/PageProgressProvider.jsx";
import { AuthProvider, useAuth } from "./context/AuthProvider.jsx";
import Login from "./pages/admin/Login.jsx";
import CodeList from "./pages/admin/CodeList.jsx";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/admin/login" />;
};

export default function App() {

  return (
    <AuthProvider>
      <PageProgressProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Post />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/a/:slug/p1" element={<Page1 />} />
              <Route path="/a/:slug/p2" element={<Page2 />} />
              <Route path="/a/:slug/p3" element={<Page3 />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <CodeList />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </PageProgressProvider>
    </AuthProvider>
  );
}
