import { Link } from "react-router-dom";
import "./Home.css";
import { posts } from "../../../Data/PostData";
import { useEffect, useRef } from "react";
import AdSlot from "../../../components/adslot/AdSlot";
import PopunderTrigger from "../../../components/ads/PopunderTrigger";
import SocialBarAd from "../../../components/ads/SocialBar";

export default function Home() {
  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7"; // 300x50
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd"; // 300x250
  const adQueueRef = useRef([]);
  const enqueueAd = (loadFn) => {
    adQueueRef.current.push(loadFn);
  };

  useEffect(() => {
    const runQueue = async () => {
      for (const loadAdFn of adQueueRef.current) {
        await loadAdFn();
      }
    };
    runQueue();
  }, []);
  return (
    <div className="home-page">
      <div className="ad-center">
        <AdSlot
          id="ad-top-banner"
          keyId={bannerKey}
          width={300}
          height={50}
          onLoad={enqueueAd}
        />
      </div>

      <PopunderTrigger scriptUrl="//eminencehillsidenutrition.com/60/64/83/60648330d5724422f8d3884cae900cd4.js" />
      <SocialBarAd scriptUrl="//eminencehillsidenutrition.com/2f/35/fe/2f35fe3a9f53f6870367fd1f1f5f70e9.js" />

      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Heppto Blogs</h1>
          <p>
            Discover the latest tips, tricks, and guides to improve your online
            life.
          </p>
          <Link to="#latest-posts" className="cta-button">
            Explore Articles below
          </Link>
        </div>
      </header>
      <div className="ad-center">
        <AdSlot
          id="ad-in-article-1"
          keyId={inlineKey}
          width={300}
          height={250}
          onLoad={enqueueAd}
        />
      </div>

      {/* Latest Posts */}
      <section className="latest-posts" id="latest-posts">
        <h2>Latest Articles</h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              {post.image && (
                <img src={post.image} alt={post.title} className="post-image" />
              )}
              <div className="post-info">
                <span className="post-category">{post.category}</span>
                <span className="post-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.snippet}</p>
                <Link to={`/post/${post.id}`} className="read-more">
                  Read More ➡️
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="ad-center">
        <AdSlot
          id="ad-bottom-banner"
          keyId={bannerKey}
          width={300}
          height={50}
          onLoad={enqueueAd}
        />
      </div>
      </section>
    </div>
  );
}
