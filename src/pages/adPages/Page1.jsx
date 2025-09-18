// pages/Page1.jsx
import "./style/Page1.css";
import React, { useEffect, useRef, useState } from "react";
// Components
import HeroSection from "../../components/ads/heroSection/HeroSection";
import PopunderTrigger from "../../components/ads/PopunderTrigger";
import NativeBannerAd from "../../components/ads/NativeBanner";
import AffiliateButton from "../../components/ads/affiliateButton/AffiliateButton";
import SocialBarAd from "../../components/ads/SocialBar";
import ContentSection from "../../components/ads/contentSection/ContentSection";
import FooterSection from "../../components/ads/footerSection/FooterSection";
import { useNavigate, useParams } from "react-router-dom";
import AdSlot from "../../components/adslot/AdSlot";
import { usePageProgress } from "../../context/PageProgressProvider";
import { api } from "../../utils/api";

const Page1 = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7"; // 300x50
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd"; // 300x250
  const [showCountdown, setShowCountdown] = useState(false);
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(8); // 8 seconds
  const [showNextButton, setShowNextButton] = useState(false);
  const { setPage1Completed } = usePageProgress();

  const navigate = useNavigate();
  const adQueueRef = useRef([]);
  const enqueueAd = (loadFn) => {
    adQueueRef.current.push(loadFn);
  };

  useEffect(() => {
    api.get(`/code/${slug}`).then((res) => setData(res.data));
  }, [slug]);

  const handleStart = () => {
    setStarted(true);
    setShowCountdown(true);
  };
  const handleContinue = () => {
    setPage1Completed(true);
    navigate(`/a/${slug}/p2`);
  };

  useEffect(() => {
    const runQueue = async () => {
      for (const loadAdFn of adQueueRef.current) {
        await loadAdFn();
      }
    };
    runQueue();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!started || !showCountdown) return;
    if (countdown <= 0) {
      setShowNextButton(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, showCountdown, started]);

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
      
       <PopunderTrigger scriptUrl="//eminencehillsidenutrition.com/60/64/83/60648330d5724422f8d3884cae900cd4.js" />
      <SocialBarAd scriptUrl="//eminencehillsidenutrition.com/2f/35/fe/2f35fe3a9f53f6870367fd1f1f5f70e9.js" />
      
      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Your Hero + API content */}
          <HeroSection />
          <img src={data.imageUrl} alt={data.slug} className="blurred" />
          <div className="ad-center hint-text">
            <p className="caption">Code for this video below 👇</p>
          </div>
        </>
      )}
      {/* First Affiliate Button */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/z8a10cpf5?key=c6681c0d5e96aeb1d238fd5b1ce90c3c"
        text="🔴 Watch Full Video Here"
        color="red"
      />
        {!started && (
          <div className="ad-center">
            <button className="next-page-btn" onClick={handleStart}>
              Unlock Code
            </button>
          </div>
        )}
        {!showNextButton && showCountdown && (
          <div className="ad-center countdown-container">
            <button className="countdown-btn" disabled>
              ⏳ {countdown}s
            </button>
          </div>
        )}
  
        {/* Hint text when next button is about to appear */}
        {showNextButton && (
          <div className="ad-center hint-text">
            <p>✨ Your code is ready! Scroll down to Reveal code →</p>
          </div>
        )}
      <div className="ad-center">
        <AdSlot
          id="ad-in-article-1"
          keyId={inlineKey}
          width={300}
          height={250}
          onLoad={enqueueAd}
        />
      </div>

      {/* Countdown button placeholder below ContentSection */}

      {/* Inline Ads inside content */}

      {/* Secondary Affiliate Button */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/ajhx1hak?key=18e4deb08a2f261c26fb60811c2ad8aa"
        text="🟢 Unlock in HD Quality"
        color="green"
      />
      {showNextButton && (
        <div className="ad-center hint-text">
          <p>✨ To unlock {slug} code press Reveal Code</p>
        </div>
      )}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/z8a10cpf5?key=c6681c0d5e96aeb1d238fd5b1ce90c3c"
        text="🔴 Reveal Code Now"
        color="red"
      />

      {/* Last Inline Ad (after comments/fake engagement) */}
      

      {/* Next Page Button above Footer */}
      <div className="ad-center">
        <AdSlot
          id="ad-in-article-2"
          keyId={inlineKey}
          width={300}
          height={250}
          onLoad={enqueueAd}
        />
      </div>
      {showNextButton && (
        <div className="ad-center next-btn-container">
          <button className="next-page-btn" onClick={handleContinue}>
            Reveal Code
          </button>
        </div>
      )}

      {/* Footer with Telegram CTA */}
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
    </div>
  );
};

export default Page1;
