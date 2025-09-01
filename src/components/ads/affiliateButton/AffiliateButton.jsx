// components/common/AffiliateButton.jsx
import React from "react";
import "./AffiliateButton.css"; // keep CSS separate

const AffiliateButton = ({ url, text = "Get Offer", color = "red" }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`affiliate-btn ${color}`}
    >
      {text}
    </a>
  );
};

export default AffiliateButton;
