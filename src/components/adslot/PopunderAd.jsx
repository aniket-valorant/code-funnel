import React from "react";

export default function PopunderAd({ scriptSrc, onTrigger, buttonText = "Continue", className = "" }) {
  const handleClick = () => {
    // Only trigger popunder on user click
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);

    // Call optional callback after triggering popunder
    if (onTrigger) onTrigger();
  };

  return (
    <button onClick={handleClick} className={`popunder-button ${className}`}>
      {buttonText}
    </button>
  );
}
