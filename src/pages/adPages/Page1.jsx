// pages/Page1.jsx
import React from "react";
// Components
import HeroSection from "../../components/ads/heroSection/HeroSection";
import PopunderTrigger from "../../components/ads/PopunderTrigger";
import NativeBannerAd from "../../components/ads/NativeBanner";
import AffiliateButton from "../../components/ads/affiliateButton/AffiliateButton";
import SocialBarAd from "../../components/ads/SocialBar";
import ContentSection from "../../components/ads/contentSection/ContentSection";
import InlineAd from "../../components/ads/InlineAd";
import FooterSection from "../../components/ads/footerSection/FooterSection";
import { useNavigate } from "react-router-dom";


const Page1 = () => {

  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* 🔝 Hero Section */}
      <HeroSection />

      {/* Popunder Trigger – fires on first click */}
      <PopunderTrigger scriptUrl= "//eminencehillsidenutrition.com/60/64/83/60648330d5724422f8d3884cae900cd4.js" />

      {/* Native Banner Ad */}
      <NativeBannerAd adKey="bcd347a8d76ba1cf8ae9a02aec447cfd" />

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

      {/* Inline Ads inside content */}
      <InlineAd adKey="f0fb375a70e618a337898e0611ab95dd" />
      <InlineAd adKey="f0fb375a70e618a337898e0611ab95dd" />

      {/* Secondary Affiliate Button */}
      <AffiliateButton
        url="https://eminencehillsidenutrition.com/ajhx1hak?key=18e4deb08a2f261c26fb60811c2ad8aa"
        text="🟢 Unlock Full HD Video"
        color="green"
      />

      {/* Banner Ad in between */}
      <NativeBannerAd adKey="bcd347a8d76ba1cf8ae9a02aec447cfd" />
      

      {/* Last Inline Ad (after comments/fake engagement) */}
      <InlineAd adKey="f0fb375a70e618a337898e0611ab95dd" />
      

      {/* Footer with Telegram CTA */}
      <FooterSection telegramUrl="https://t.me/yourchannel" />
    </div>
  );
};

export default Page1;
