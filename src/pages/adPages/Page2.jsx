// pages/Page2.jsx
import React, { useEffect, useRef, useState } from "react";
import PopunderTrigger from "../../components/ads/PopunderTrigger";
import NativeBannerAd from "../../components/ads/NativeBanner";
import AffiliateButton from "../../components/ads/affiliateButton/AffiliateButton";
import ContentSection from "../../components/ads/contentSection/ContentSection";
import SocialBarAd from "../../components/ads/SocialBar";
import FooterSection from "../../components/ads/footerSection/FooterSection";
import { useNavigate, useParams } from "react-router-dom";
import AdSlot from "../../components/adslot/AdSlot";
import "./style/Page2.css"

const Page2 = () => {
  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7"; // 300x50
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd"; // 300x250
  const [countdown, setCountdown] = useState(8);
  const [showNextButton, setShowNextButton] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const adQueueRef = useRef([]);
  const enqueueAd = (loadFn) => {
    adQueueRef.current.push(loadFn);
  };
  useEffect(() => {
    if (countdown <= 0) {
      setShowNextButton(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const runQueue = async () => {
      for (const loadAdFn of adQueueRef.current) {
        await loadAdFn();
      }
    };
    runQueue();
  }, []);

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
      <header className="hero-section">
        <h1 className="site-title">{slug} code Site</h1>
        <p className="headline">Almost there 🔓</p>
      </header>

      {/* Popunder Trigger */}
      <PopunderTrigger scriptUrl="//eminencehillsidenutrition.com/60/64/83/60648330d5724422f8d3884cae900cd4.js" />

      {/* Affiliate Button */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/z8a10cpf5?key=c6681c0d5e96aeb1d238fd5b1ce90c3c"
        text="🔴 Instant Access Here"
        color="red"
      />

      {/* Content */}
      <ContentSection previewImg="/assets/video-preview2.jpg" />

       {!showNextButton && (
        <div className="ad-center countdown-container">
          <p className="hint-text">✨ Your {slug} code is revealing... {countdown} sec</p>
        </div>
      )}

      {showNextButton && (
        <div className="ad-center countdown-container">
          <p className="hint-text">✨ Your {slug} code is revealed ✨Scroll down to Reveal Code button </p>
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

      {/* Social Bar */}
      <SocialBarAd adKey="YOUR_SOCIAL_BAR_KEY" />

      {/* Secondary Affiliate Button */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/ajhx1hak?key=18e4deb08a2f261c26fb60811c2ad8aa"
        text="🟢 Continue to Full Video"
        color="green"
      />
      <div className="ad-center">
        <AdSlot
          id="ad-in-article-2"
          keyId={inlineKey}
          width={300}
          height={250}
          onLoad={enqueueAd}
        />
      </div>

      <p className="hint-text">🚀 {slug} code is revealed Press Reveal Code button</p>
      {showNextButton && (
        <div className="ad-center next-btn-container" style={{ marginTop: "40px" }}>
          <button
            className="next-page-btn"
            onClick={() => navigate(`/a/${slug}/p3`)}
          >
            Reveal code
          </button>
        </div>
      )}

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

export default Page2;
