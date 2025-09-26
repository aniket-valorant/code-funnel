import React, { useEffect } from "react";

const AdsterraBanner = ({ scriptSrc, containerId }) => {
  useEffect(() => {
    const scriptId = `script-${containerId}`;

    // If script already added, do nothing
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    // Always force HTTPS
    script.src = scriptSrc.startsWith("http")
      ? scriptSrc
      : `https:${scriptSrc}`;

    // Retry logic if script fails
    script.onerror = () => {
      console.warn(`Adsterra script failed: ${script.src}`);
      setTimeout(() => {
        const retry = document.createElement("script");
        retry.id = scriptId + "-retry";
        retry.async = true;
        retry.setAttribute("data-cfasync", "false");
        retry.src = script.src;
        document.body.appendChild(retry);
      }, 3000);
    };

    document.body.appendChild(script);
  }, [scriptSrc, containerId]);

  return <div id={containerId} style={{ textAlign: "center", margin: "20px 0" }} />;
};

export default AdsterraBanner;
