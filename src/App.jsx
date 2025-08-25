import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ArticlePage1 from "./pages/code-funnel/ArticlePage1.jsx";
import Page2 from "./pages/code-funnel/Page2.jsx";
import Page3 from "./pages/code-funnel/Page3.jsx";
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

export default function App() {
  return (
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
          <Route path="/a/:slug/start" element={<ArticlePage1 />} />
          <Route path="/a/:slug/verify" element={<Page2 />} />
          <Route path="/a/:slug/complete" element={<Page3 />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
