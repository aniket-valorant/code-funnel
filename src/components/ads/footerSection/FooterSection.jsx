// components/layout/FooterSection.jsx
import React from "react";
import "./FooterSection.css";

const FooterSection = ({ telegramUrl }) => {
  return (
    <footer className="footer-section">
      <p>More videos? Join Telegram 📲</p>
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-btn"
      >
        Join Free Channel
      </a>
    </footer>
  );
};

export default FooterSection;
