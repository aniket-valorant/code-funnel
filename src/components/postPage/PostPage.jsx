import { useParams, Link } from "react-router-dom";
import { posts } from "../../Data/PostData";
import "./PostPage.css";

export default function PostPage() {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <p className="not-found">Post not found.</p>;

  return (
    <div className="post-page">
      <div className="post-container">
        <Link to="/" className="back-link">⬅️ Back to Home</Link>

        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta">
          <span className="category">{post.category}</span>
          <span className="date">{post.date}</span>
        </div>

        {post.image && (
          <div className="post-image-wrapper">
            <img src={post.image} alt={post.title} className="post-image" />
          </div>
        )}

        <div className="post-content">
          {post.content.split("\n").map((para, index) => (
            para.trim() ? <p key={index}>{para}</p> : <br key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
