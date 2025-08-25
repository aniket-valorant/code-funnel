import React, { useEffect, useState } from "react";
import "./Styles/Page2.css";
import { useNavigate, useParams } from "react-router-dom";

const Page2 = () => {
    const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [continueClicks, setContinueClicks] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const { slug } = useParams(); 
  const navigate = useNavigate();

  const openAdPopup = () => {
    window.open("about:blank", "_blank", "noopener");
  };

  // start countdown
  const handleStart = () => {
    if (!started) setStarted(true);
  };

   // countdown logic
  useEffect(() => {
    if (!started || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [started, countdown]);

  // show continue button after verification
  useEffect(() => {
    if (countdown === 0 && started) {
      setShowContinue(true);
    }
  }, [countdown, started]);

  
  // continue button logic
  const handleContinue = () => {
    if (continueClicks === 0) {
      openAdPopup(); // fake click
      setContinueClicks(1);
      return;
    }
    // real navigation
    navigate(`/a/${slug}/complete`);
  };

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="article-page">
      {/* Header Ad */}
      <div className="ad-header">
        <span className="ad-label">Advertisement</span>
        <div className="ad-box">728x90 Banner Ad</div>
      </div>

      {/* Article */}
      <div className="content">
        <h1 className="title">Top 5 Street Foods in Mumbai 🍲</h1>
        <p className="subtitle">
          Discover mouth-watering street food that makes Mumbai famous.
        </p>

          {/* === VERIFICATION START (TOP) === */}
        {!started ? (
          <div className="verify-box">
            <p className="verify-text">
              Start a quick <b>10s verification</b> to continue.
            </p>
            <button className="btn-dark" onClick={handleStart}>
              Start Verification
            </button>
          </div>
        ) : countdown > 0 ? (
          <div className="verify-box">
            <p className="verify-text">
              Verifying… <b>{countdown}s</b> remaining
            </p>
            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${Math.round(((10 - countdown) / 10) * 100)}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="verify-box">
            <p className="verify-text success">Verification complete ✅</p>
            <p className="scroll-hint">Scroll down to continue...</p>
          </div>
        )}


        <p>
          1️⃣ <span className="bold">Vada Pav</span> – Known as the Indian burger,
          this spicy potato filling wrapped in bread is a must-try.
        </p>

        {/* Inline Ad */}
        <div className="ad-inline">
          <span className="ad-label">Sponsored</span>
          <div className="ad-box">300x250 Inline Ad</div>
        </div>

        <p>
          2️⃣ <span className="bold">Pani Puri</span> – Crispy puris filled with
          tangy water, chutney, and potato stuffing. Perfect for evening snacks.
        </p>

        <p>
          3️⃣ <span className="bold">Pav Bhaji</span> – Spicy mashed vegetables
          served with buttery bread rolls. A street-side classic.
        </p>

        <p>
          4️⃣ <span className="bold">Sev Puri</span> – Crisp puris topped with
          chutney, potatoes, and sev. A burst of flavors in every bite.
        </p>


 {/* === CONTINUE SECTION (only after verification) === */}
        {showContinue && (
          <div className="continue-section">
            {continueClicks === 0 ? (
              <button className="btn-primary" onClick={handleContinue}>
                User Attached ➡️
              </button>
            ) : (
              <div className="continue-real">
                <div className="hint">Thanks — click again to proceed.</div>
                <button className="btn-success" onClick={handleContinue}>
                  Continue to Final Page ➡️
                </button>
              </div>
            )}
          </div>
        )}

        {/* Another Inline Ad */}
        <div className="ad-inline">
          <span className="ad-label">Sponsored</span>
          <div className="ad-box">300x250 Inline Ad</div>
        </div>

        <p>
          5️⃣ <span className="bold">Falooda</span> – A sweet cold dessert with
          rose syrup, jelly, and ice cream. Perfect way to end your street food
          journey!
        </p>
      </div>


      {/* Sticky Bottom Ad */}
      <div className="sticky-ad">
        <span className="ad-label">Advertisement</span>
        <div className="ad-box">Sticky 320x50 Banner</div>
      </div>
    </div>
  );
};

export default Page2;
