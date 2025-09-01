import { useEffect, useRef } from "react";

const AdSlot = ({ id, keyId, width = 300, height = 250, onLoad }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous ad
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

    // External script
    const externalScript = document.createElement("script");
    externalScript.type = "text/javascript";
    externalScript.src = "//www.highperformanceformat.com/" + keyId + "/invoke.js";

    // Callbacks
    externalScript.onload = () => onLoad && onLoad(true);
    externalScript.onerror = () => onLoad && onLoad(false);

    // Append scripts
    container.appendChild(inlineScript);
    container.appendChild(externalScript);

    // Cleanup on unmount or key change
    return () => {
      container.innerHTML = "";
    };
  }, [keyId, width, height, onLoad]);

  return (
    <div
      id={id}
      ref={containerRef}
      style={{ minHeight: height, minWidth: width }}
    />
  );
};

export default AdSlot;
