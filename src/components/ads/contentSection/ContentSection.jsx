// components/layout/ContentSection.jsx
import React from "react";
import "./ContentSection.css";

const ContentSection = ({ previewImg }) => {
  return (
    <div className="content-section">
      
      <img src={previewImg} alt="Video Preview" className="blurred-thumbnail" />
      <p className="caption">Code for this video below 👇</p>
    
    </div>
  );
};

export default ContentSection;
