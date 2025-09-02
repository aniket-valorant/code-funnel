// pages/Page1.jsx
import "./style/Style.css";
import React, { useEffect, useRef, useState } from "react";
// Components
import HeroSection from "../../components/ads/heroSection/HeroSection";
import PopunderTrigger from "../../components/ads/PopunderTrigger";
import NativeBannerAd from "../../components/ads/NativeBanner";
import AffiliateButton from "../../components/ads/affiliateButton/AffiliateButton";
import SocialBarAd from "../../components/ads/SocialBar";
import ContentSection from "../../components/ads/contentSection/ContentSection";
import InlineAd from "../../components/ads/InlineAd";
import FooterSection from "../../components/ads/footerSection/FooterSection";
import { useNavigate, useParams } from "react-router-dom";
import AdSlot from "../../components/adslot/AdSlot";

const Page1 = () => {
  const { slug } = useParams();
  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7"; // 300x50
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd"; // 300x250
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10); // 10 seconds
  const [showNextButton, setShowNextButton] = useState(false);

  const navigate = useNavigate();
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


  useEffect(() => {
    setShowCountdown(true);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!showCountdown) return;
    if (countdown <= 0) {
      setShowNextButton(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, showCountdown]);

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
      {/* 🔝 Hero Section */}
      <HeroSection />

      {/* Popunder Trigger – fires on first click */}
      <PopunderTrigger scriptUrl="//eminencehillsidenutrition.com/60/64/83/60648330d5724422f8d3884cae900cd4.js" />

      {/* Native Banner Ad */}

      {/* First Affiliate Button */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/z8a10cpf5?key=c6681c0d5e96aeb1d238fd5b1ce90c3c"
        text="🔴 Get Full Video Here"
        color="red"
      />

      {/* Floating Social Bar */}
      <SocialBarAd scriptUrl="//eminencehillsidenutrition.com/2f/35/fe/2f35fe3a9f53f6870367fd1f1f5f70e9.js" />
      {/* Content with blurred thumbnail */}
      <ContentSection previewImg="/assets/video-preview.jpg" />

      {/* Countdown button placeholder below ContentSection */}
      {!showNextButton && showCountdown && (
        <div className="ad-center countdown-container">
          <button className="countdown-btn" disabled>
            ⏳ Preparing your {slug} code... {countdown} sec
          </button>
        </div>
      )}

      {/* Hint text when next button is about to appear */}
      {showNextButton && (
        <div className="ad-center hint-text">
          <p>✨ Your code is ready! Scroll down to continue →</p>
        </div>
      )}

      {/* Inline Ads inside content */}
      <div className="ad-center">
        <AdSlot
          id="ad-in-article-1"
          keyId={inlineKey}
          width={300}
          height={250}
          onLoad={enqueueAd}
        />
      </div>

      {/* Secondary Affiliate Button */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/ajhx1hak?key=18e4deb08a2f261c26fb60811c2ad8aa"
        text="🟢 Unlock Full HD Video"
        color="green"
      />

      {/* Last Inline Ad (after comments/fake engagement) */}
      <div className="ad-center">
        <AdSlot
          id="ad-in-article-2"
          keyId={inlineKey}
          width={300}
          height={250}
          onLoad={enqueueAd}
        />
      </div>

      {/* Next Page Button above Footer */}
      <div className="ad-center hint-text">
        <p>✨ To unlock {slug} code press continue</p>
      </div>
      {showNextButton && (
        <div className="ad-center next-btn-container">
          <button
            className="next-page-btn"
            onClick={() => navigate(`/a/${slug}/p2`)}
          >
            Continue
          </button>
        </div>
      )}

      {/* Footer with Telegram CTA */}
      <FooterSection telegramUrl="https://t.me/yourchannel" />
    </div>
  );
};

export default Page1;
