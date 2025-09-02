import { useEffect, useRef } from "react";

const AdSlot = ({ id, keyId, width, height, onLoad }) => {
  const containerRef = useRef(null);

  const loadAd = () => {
    return new Promise((resolve) => {
      const container = containerRef.current;
      if (!container) return resolve();

      container.innerHTML = ""; // clear previous content

      // Inline options script
      const inlineScript = document.createElement("script");
      inlineScript.type = "text/javascript";
      inlineScript.innerHTML = `
        window.atOptions = {
          'key': '${keyId}',
          'format': 'iframe',
          'height': ${height},
          'width': ${width},
          'params': {}
        };
      `;

      // External ad script
      const externalScript = document.createElement("script");
      externalScript.type = "text/javascript";
      // externalScript.src = "//www.highperformanceformat.com/" + keyId + "/invoke.js";
      externalScript.src = "//eminencehillsidenutrition.com/" + keyId + "/invoke.js";

      // Resolve promise on load or after 2 seconds fallback
      externalScript.onload = () => resolve();
      externalScript.onerror = () => resolve(); 
      setTimeout(() => resolve(), 2000);

      container.appendChild(inlineScript);
      container.appendChild(externalScript);
    });
  };

  useEffect(() => {
    if (onLoad) onLoad(loadAd);
  }, [keyId, width, height, onLoad]);

  return <div id={id} ref={containerRef} />;
};

export default AdSlot;
