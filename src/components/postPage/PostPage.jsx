import { useParams, Link } from "react-router-dom";
import { posts } from "../../Data/PostData";
import "./PostPage.css";

export default function PostPage() {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-page">
      <Link to="/" className="back-link">⬅️ Back to Home</Link>

      <h1>{post.title}</h1>
      <div className="post-meta">
        <span className="category">{post.category}</span>
        <span className="date">{post.date}</span>
      </div>
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}
      <div className="post-content">
        {post.content.split("\n").map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </div>
  );
}
