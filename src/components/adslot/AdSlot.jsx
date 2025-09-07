import { useEffect, useRef } from "react";

const AdSlot = ({ id, keyId, width, height, onLoad }) => {
  const containerRef = useRef(null);
  const loadedRef = useRef(false); // track if ad is already loaded

  const loadAd = () => {
    return new Promise((resolve) => {
      if (loadedRef.current) return resolve(); // prevent re-loading
      const container = containerRef.current;
      if (!container) return resolve();

      // clear previous content (optional, only if you want to refresh)
      container.innerHTML = "";

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
      externalScript.src = "//eminencehillsidenutrition.com/" + keyId + "/invoke.js";

      // Resolve promise on load or fallback
      externalScript.onload = () => {
        loadedRef.current = true; // mark as loaded
        resolve();
      };
      externalScript.onerror = () => resolve(); 
      setTimeout(() => resolve(), 2000);

      container.appendChild(inlineScript);
      container.appendChild(externalScript);
    });
  };

  useEffect(() => {
    if (onLoad) onLoad(loadAd);
  }, [keyId, width, height, onLoad]);

  return <div id={id} ref={containerRef} style={{ width, height }} />;
};  

export default AdSlot;
