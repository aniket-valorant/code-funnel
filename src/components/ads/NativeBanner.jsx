import { useEffect, useRef } from "react";

const NativeBannerAd = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.src = "//eminencehillsidenutrition.com/bcd347a8d76ba1cf8ae9a02aec447cfd/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    // Append to body (or head)
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="container-bcd347a8d76ba1cf8ae9a02aec447cfd"></div>
  );
};

export default NativeBannerAd;
