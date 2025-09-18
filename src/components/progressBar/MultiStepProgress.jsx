// components/MultiStepProgress.jsx
import React from "react";
import "./MultiStepProgress.css";

const MultiStepProgress = ({ steps, currentStep }) => {
  return (
    <div className="multi-step-container">
      {steps.map((step, index) => {
        const isActive = currentStep === index + 1;
        const isCompleted = currentStep > index + 1;

        return (
          <div key={index} className="step-wrapper">
            <div
              className={`step-circle ${isActive ? "active" : ""} ${
                isCompleted ? "completed" : ""
              }`}
            >
              {isCompleted ? "✔" : index + 1}
            </div>
            <span
              className={`step-label ${isActive ? "active" : ""}`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`step-line ${
                  isCompleted ? "completed" : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MultiStepProgress;
