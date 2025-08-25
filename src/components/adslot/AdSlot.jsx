// src/components/AdSlot.jsx
import { useEffect } from "react";

export default function AdSlot({
  id,
  adKey,       // for Adsterra iframe/banner ads
  width,
  height,
  format = "iframe",
  src,         // for direct script ads (Propeller/Adsterra .js links)
}) {
  useEffect(() => {
    const container = document.getElementById(id);
    if (!container) return;

    // cleanup before mounting
    container.innerHTML = "";

    if (adKey) {
      // Case 1: Adsterra with adKey + invoke.js
      const inline = document.createElement("script");
      inline.type = "text/javascript";
      inline.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : '${format}',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      container.appendChild(inline);

      const external = document.createElement("script");
      external.type = "text/javascript";
      external.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
      container.appendChild(external);
    } 
    else if (src) {
      // Case 2: Direct script-based ads
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.async = true;
      container.appendChild(script);
    }

    // cleanup on unmount
    return () => {
      container.innerHTML = "";
    };
  }, [id, adKey, width, height, format, src]);

  return (
    <div
      id={id}
      className="ad-box"
      style={{
        height: height ? `${height}px` : "auto",
        background: "#f5f5f5",
        textAlign: "center",
        padding: "4px",
      }}
    >
      <span style={{ fontSize: "12px", color: "#666" }}>Loading ad…</span>
    </div>
  );
}
