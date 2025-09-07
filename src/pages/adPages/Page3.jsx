// pages/Page3.jsx
import React, { useEffect, useRef, useState } from "react";
import PopunderTrigger from "../../components/ads/PopunderTrigger";
import AffiliateButton from "../../components/ads/affiliateButton/AffiliateButton";
import SocialBarAd from "../../components/ads/SocialBar";
import FooterSection from "../../components/ads/footerSection/FooterSection";
import AdSlot from "../../components/adslot/AdSlot";
import { useNavigate, useParams } from "react-router-dom";

import "./style/Page3.css";
import { usePageProgress } from "../../context/PageProgressProvider";
import { api } from "../../utils/api";
const Page3 = () => {
  const navigate = useNavigate();
  const { page1Completed, page2Completed } = usePageProgress();
  const { slug } = useParams();
  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7"; // 300x50
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd"; // 300x250

  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(6); // 6 sec countdown
  const [showCode, setShowCode] = useState(false);
  const [codeData, setCodeData] = useState(null);

  useEffect(() => {
    if (!page1Completed || !page2Completed) {
      alert("You must complete previous pages first!");
      navigate(`/a/${slug}/p1`);
    }
  }, [page1Completed, page2Completed, navigate, slug]);

  useEffect(() => {
    if (!started) return;
    if (countdown <= 0) {
      setShowCode(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, started]);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const res = await api.get(`/code/${slug}`); // endpoint returns { code, imageUrl, slug }
        setCodeData(res.data);
      } catch (err) {
        console.error("Failed to fetch code:", err);
        alert("Failed to load your code. Try again later.");
      }
    };

    fetchCode();
  }, [slug]);

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

  const copyCode = () => {
    navigator.clipboard.writeText("xyz");
    alert("Code copied to clipboard!");
  };

  return (
    <div className="page-container">
      <div className="ad-center">
        <AdSlot
          id="ad-top-banner"
          keyId={bannerKey}
          width={300}
          height={50}
          onLoad={enqueueAd}
        />
      </div>
      {/* 🔝 Top Section */}
      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="site-title">🎉 Congratulations!</h1>
        <p className="headline">
          You’ve reached the <strong>final page</strong>. Your code is just one
          click away!
        </p>
      </header>

      {!showCode && (
        <div className="code-section">
          <div className="code-card">
            <h3>{slug}</h3>
            <img
              src={codeData?.imageUrl}
              alt="Unlocked code"
              className="code-image"
            />
            <p className="scroll-text">👇 Scroll down to Unlock code 👇</p>
          </div>
        </div>
      )}

      {/* Unlock Button */}

      {/* Popunder Trigger */}
      <PopunderTrigger scriptUrl="//eminencehillsidenutrition.com/60/64/83/60648330d5724422f8d3884cae900cd4.js" />

      {/* Affiliate Button Primary */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/z8a10cpf5?key=c6681c0d5e96aeb1d238fd5b1ce90c3c"
        text="🔴 Get Download / Full Access"
        color="red"
      />

      {!started && (
        <div className="ad-center">
          <button className="unlock-btn" onClick={() => setStarted(true)}>
            🔓 Unlock My Code
          </button>
        </div>
      )}
      {showCode && (
        <div className="code-section">
          <p className="scroll-text">👇 Scroll down to view your code 👇</p>
        </div>
      )}

      {/* Countdown */}
      {started && !showCode && (
        <div className="countdown-container">
          <p className="hint-text">⏳ Please wait... {countdown} sec</p>
        </div>
      )}

      {/* Inline Ads */}
      <div className="ad-center">
        <AdSlot
          id="ad-in-article-1"
          keyId={inlineKey}
          width={300}
          height={250}
          onLoad={enqueueAd}
        />
      </div>

      {/* Social Bar Ad */}
      <SocialBarAd scriptUrl="//eminencehillsidenutrition.com/2f/35/fe/2f35fe3a9f53f6870367fd1f1f5f70e9.js" />

      {/* Secondary Affiliate Button */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/ajhx1hak?key=18e4deb08a2f261c26fb60811c2ad8aa"
        text="🟢 Final Step – Unlock Now"
        color="green"
      />

      {showCode && (
        <div className="code-section">
          <div className="code-card">
            <h3>{slug}</h3>
            <img
              src={codeData?.imageUrl}
              alt="Unlocked code"
              className="code-image"
            />
            <pre className="code-box">{codeData.code}</pre>
            <button className="copy-btn" onClick={copyCode}>
              📋 Copy Code
            </button>
          </div>
        </div>
      )}

      {/* Fake Comments */}

      <div className="ad-center">
        <AdSlot
          id="ad-in-article-2"
          keyId={inlineKey}
          width={300}
          height={250}
          onLoad={enqueueAd}
        />
      </div>

      {/* Footer */}
      <FooterSection telegramUrl="https://t.me/yourchannel" />
      <div className="ad-center sticky-bottom-banner">
        <AdSlot
          id="ad-bottom-banner"
          keyId={bannerKey}
          width={300}
          height={50}
          onLoad={enqueueAd}
        />
      </div>
      <section className="comments-section">
        <h3>Recent Feedback</h3>
        <div className="comment">
          <img src="https://i.pravatar.cc/32?img=1" alt="User" />
          <div className="comment-body">
            <span className="username">Alex P.</span>
            <span className="time">• 2h ago</span>
            <p>🔥 Works perfectly, unlocked it in just 2 minutes!</p>
          </div>
        </div>

        <div className="comment">
          <img src="https://i.pravatar.cc/32?img=5" alt="User" />
          <div className="comment-body">
            <span className="username">Sophie L.</span>
            <span className="time">• 5h ago</span>
            <p>Wow, finally a real link 😍 thanks so much!</p>
          </div>
        </div>

        <div className="comment">
          <img src="https://i.pravatar.cc/32?img=8" alt="User" />
          <div className="comment-body">
            <span className="username">Rahul K.</span>
            <span className="time">• 1d ago</span>
            <p>Thanks bro 🙏 this is legit. Subscribed to your channel!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page3;
