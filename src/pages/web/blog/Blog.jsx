import { Link } from "react-router-dom";
import "./Blog.css";
import { posts } from "../../../Data/PostData";

export default function Blog() {
  return (
    <div className="blog-page">
      <h1>Heppto Blogs</h1>
      <p>Explore all our articles and guides below.</p>

      <div className="blog-list">
        {posts.map(post => (
          <div key={post.id} className="blog-card">
            {post.image && <img src={post.image} alt={post.title} className="blog-thumb" />}
            <div className="blog-info">
              <h3>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              <span className="blog-meta">
                {post.category} | {post.date}
              </span>
              <p>{post.snippet}</p>
              <Link to={`/post/${post.id}`} className="read-more">Read More ➡️</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
