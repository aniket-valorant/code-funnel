// components/ProgressBar.jsx
import React from "react";
import "./ProgressBar.css"; // styling

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
