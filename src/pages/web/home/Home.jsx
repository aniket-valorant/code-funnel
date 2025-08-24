import { Link } from "react-router-dom";
import "./Home.css";
import { posts } from "../../../Data/PostData";

export default function Home() {
  return (
    <div className="home-page">
      
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Heppto Blogs</h1>
          <p>Discover the latest tips, tricks, and guides to improve your online life.</p>
          <Link to="#latest-posts" className="cta-button">Explore Articles below</Link>
        </div>
      </header>

      {/* Latest Posts */}
      <section className="latest-posts" id="latest-posts">
        <h2>Latest Articles</h2>
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              {post.image && <img src={post.image} alt={post.title} className="post-image" />}
              <div className="post-info">
                <span className="post-category">{post.category}</span>
                <span className="post-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.snippet}</p>
                <Link to={`/post/${post.id}`} className="read-more">Read More ➡️</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
