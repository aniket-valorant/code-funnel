import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { revealCode } from "../../api";
import "./Styles/finalPage.css";

const Page3 = () => {
  const { slug } = useParams();
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [continueClicks, setContinueClicks] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);

  const [copied, setCopied] = useState(false);
  const [copyErr, setCopyErr] = useState(null);

  // Replace with your ad network show() method
  const openAdPopup = () => {
    // Example placeholder (replace with Adsterra/Propeller call)
    // window._pu && window._pu.show();
    window.open("about:blank", "_blank", "noopener"); 
  };

  const handleStart = () => {
    if (!started) setStarted(true);
  };

  useEffect(() => {
    if (!started || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [started, countdown]);

  const handleContinue = async () => {
    if (continueClicks === 0) {
      openAdPopup(); // fake
      setContinueClicks(1);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await revealCode(slug); // expects { code: "..." }
      setCode(data.code);
      setUnlocked(true);
    } catch (err) {
      console.error(err);
      setError("Failed to load code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Copy & play ad in the same click
  const handleCopyCode = async () => {
    setCopyErr(null);
    try {
      // Fire ad first (still a user gesture)
      openAdPopup();

      const text = String(code ?? "");
      if (!text) throw new Error("No code available");

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for http/non-secure/iOS
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error(e);
      setCopyErr("Couldn’t copy. Long-press the code to copy.");
    }
  };

  return (
    <div className="final-page">
      {/* Header Ad */}
      <div className="ad-header">
        <span className="ad-label">Advertisement</span>
        <div className="ad-box">728x90 Banner Ad</div>
      </div>

      <div className="content">
        <h1 className="title">🎉 Final Step</h1>
        <p className="subtitle">
          Unlock your special code below. Complete verification to access 👇
        </p>

        {/* Verification */}
        {!started ? (
          <div className="verify-box">
            <p className="verify-text">
              Click below to start <b>10s verification</b>.
            </p>
            <button className="btn-dark" onClick={handleStart}>Start Verification</button>
          </div>
        ) : countdown > 0 ? (
          <div className="verify-box">
            <p className="verify-text">Verifying… <b>{countdown}s</b> remaining</p>
            <div className="progress">
              <div className="progress-bar"
                   style={{ width: `${Math.round(((10 - countdown) / 10) * 100)}%` }} />
            </div>
          </div>
        ) : !unlocked ? (
          <div className="verify-box">
            <p className="verify-text success">Verification complete ✅</p>
            <p className="scroll-hint">Scroll down to continue...</p>
          </div>
        ) : null}

        {/* Inline Ad */}
        <div className="ad-inline">
          <span className="ad-label">Sponsored</span>
          <div className="ad-box">300x250 Inline Ad</div>
        </div>

        {/* Continue */}
        {countdown === 0 && !unlocked && (
          <div className="continue-section">
            {continueClicks === 0 ? (
              <button className="btn-primary" onClick={handleContinue}>Get My Code ➡️</button>
            ) : (
              <div className="continue-real">
                <div className="hint">Thanks — click again to reveal your code.</div>
                <button className="btn-success" onClick={handleContinue} disabled={loading}>
                  {loading ? "Loading..." : "Unlock Code 🔓"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Revealed content */}
        {unlocked && (
          <div id="real-content" className="hidden-content">
            <h2>✅ Your Code is Ready</h2>

            {error ? (
              <p className="error">{error}</p>
            ) : (
              <>
                <p>Copy your code below and use it instantly:</p>

                <div className="code-actions">
                  <div className="code-box">{code || "No code"}</div>
                  <button className="btn-primary copy-btn" onClick={handleCopyCode}>
                    {copied ? "Copied ✔" : "Copy Code"}
                  </button>
                </div>

                {copyErr && <p className="copy-error">{copyErr}</p>}

                {/* Ad near code */}
                <div className="ad-inline">
                  <span className="ad-label">Sponsored</span>
                  <div className="ad-box">300x250 Inline Ad</div>
                </div>

                <p>Need help? <a href="/support">Contact Support</a></p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Sticky Ad */}
      <div className="sticky-ad">
        <span className="ad-label">Advertisement</span>
        <div className="ad-box">Sticky 320x50 Banner</div>
      </div>
    </div>
  );
};

export default Page3;
