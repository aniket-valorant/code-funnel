// components/ads/SocialBarAd.jsx
import { useEffect } from "react";

const SocialBarAd = ({ scriptUrl }) => {
  useEffect(() => {
    if (!scriptUrl) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptUrl;
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [scriptUrl]);

  return null; // no UI, it's a floating bar
};

export default SocialBarAd;
