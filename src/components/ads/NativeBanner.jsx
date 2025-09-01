import { useEffect, useRef } from "react";

const NativeBannerAd = ({ adKey }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!adKey || !containerRef.current) return;

    // Prevent double init
    if (containerRef.current.dataset.initialized) return;
    containerRef.current.dataset.initialized = "true";

    // Create matching container div first
    const div = document.createElement("div");
    div.id = `container-${adKey}`;
    containerRef.current.appendChild(div);

    // Then load the script
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `//eminencehillsidenutrition.com/${adKey}/invoke.js`;

    containerRef.current.appendChild(script);
  }, [adKey]);

  return (
    <div
      ref={containerRef}
      style={{ textAlign: "center", margin: "1rem 0" }}
    />
  );
};

export default NativeBannerAd;
