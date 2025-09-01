import { useEffect, useRef } from "react";

const InlineAd = ({ adKey, width = 300, height = 250 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!adKey || !containerRef.current) return;

    // Clear previous ad
    containerRef.current.innerHTML = "";

    // Create the script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    // Wrap atOptions in an IIFE to avoid global conflicts
    script.innerHTML = `
      (function() {
        var atOptions = {
          'key': '${adKey}',
          'format': 'iframe',
          'height': ${height},
          'width': ${width},
          'params': {}
        };
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = '//eminencehillsidenutrition.com/${adKey}/invoke.js';
        s.async = true;
        document.currentScript.parentNode.appendChild(s);
      })();
    `;

    containerRef.current.appendChild(script);
  }, [adKey, width, height]);

  return <div ref={containerRef} style={{ margin: "1rem 0", textAlign: "center" }} />;
};

export default InlineAd;
