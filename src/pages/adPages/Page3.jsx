// pages/Page3.jsx
import React, { useEffect, useRef, useState } from "react";
import PopunderTrigger from "../../components/ads/PopunderTrigger";
import AffiliateButton from "../../components/ads/affiliateButton/AffiliateButton";
import SocialBarAd from "../../components/ads/SocialBar";
import FooterSection from "../../components/ads/footerSection/FooterSection";
import AdSlot from "../../components/adslot/AdSlot";
import { useParams } from "react-router-dom";
import './style/Page3.css'
const Page3 = () => {
  const { slug } = useParams();
  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7"; // 300x50
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd"; // 300x250

    const [countdown, setCountdown] = useState(8); // 8 sec countdown
  const [showCode, setShowCode] = useState(false);


useEffect(() => {
    if (countdown <= 0) {
      setShowCode(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);


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
          Your code for {slug} is almost ready!
        </p>
      </header>

      {/* Popunder Trigger */}
      <PopunderTrigger scriptUrl="//eminencehillsidenutrition.com/60/64/83/60648330d5724422f8d3884cae900cd4.js" />

      {/* Affiliate Button Primary */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/z8a10cpf5?key=c6681c0d5e96aeb1d238fd5b1ce90c3c"
        text="🔴 Get Download / Full Access"
        color="red"
      />

      {/* Countdown / Code Reveal */}
      {!showCode ? (
        <div className="ad-center countdown-container">
          <p className="hint-text">
            ⏳ Preparing your code... {countdown} sec
          </p>
        </div>
      ) : (
        <div className="ad-center code-container">
          <p className="hint-text">✅ Here is your unlocked code:</p>
          <pre className="code-box">xyz123</pre>
          <button className="copy-btn" onClick={copyCode}>
            📋 Copy Code
          </button>
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

      {/* Banner Ad */}

      {/* Fake Comments */}
      <section className="comments-section">
        <h3>Recent Feedback</h3>
        <div className="comment">🔥 Works 100%, I unlocked it in 2 mins!</div>
        <div className="comment">Wow, real link finally 😍</div>
        <div className="comment">Thanks bro 🙏 this is legit</div>
      </section>

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
      <div className="ad-center">
        <AdSlot
          id="ad-bottom-banner"
          keyId={bannerKey}
          width={300}
          height={50}
          onLoad={enqueueAd}
        />
      </div>
    </div>
  );
};

export default Page3;
