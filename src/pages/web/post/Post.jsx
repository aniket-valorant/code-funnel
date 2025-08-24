import { useParams, Link } from "react-router-dom";
import "./Post.css";

export default function Post() {
  const { id } = useParams();

  const posts = {
    1: { title: "Top 10 Productivity Tools in 2025", content: "Here are some of the best free and paid productivity tools that can help you save time and get more work done..." },
    2: { title: "5 Tips to Save Money Online", content: "Always compare prices, use coupon sites, join cashback programs, and never forget to check for seasonal offers..." },
    3: { title: "Beginner's Guide to Freelancing", content: "Freelancing is a great way to earn from home. Start by choosing your skills, building a portfolio, and joining freelance platforms..." },
    4: { title: "Top 5 Browser Extensions You Must Try", content: "Extensions like Grammarly, Honey, Momentum, and uBlock Origin can make your browsing smarter and safer..." },
    5: { title: "How to Stay Productive While Working From Home", content: "Create a routine, avoid distractions, and dedicate a workspace to stay efficient at home..." },
  };

  const post = posts[id];

  if (!post) {
    return <h2 style={{ textAlign: "center", padding: "2rem" }}>Post not found ❌</h2>;
  }

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/blog" className="back-link">⬅ Back to Blog</Link>
    </div>
  );
}
