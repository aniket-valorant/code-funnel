import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { revealCode } from "../../api";
import "./Styles/finalPage.css";
import AdSlot from "../../components/adslot/AdSlot";

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

  const adQueueRef = useRef([]);

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
      window._pu?.show?.();
      setContinueClicks(1);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await revealCode(slug);
      setCode(data.code);
      setUnlocked(true);
    } catch (err) {
      console.error(err);
      setError("Failed to load code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    setCopyErr(null);
    try {
      window._pu?.show?.();
      const text = String(code ?? "");
      if (!text) throw new Error("No code available");

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
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

  const enqueueAd = (loadFn) => {
    adQueueRef.current.push(loadFn);
  };

  useEffect(() => {
    const runQueue = async () => {
      for (const loadAdFn of adQueueRef.current) {
        await loadAdFn();
      }
    };
    runQueue();
  }, []);

  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7"; // 300x50
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd"; // 300x250

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
    <div className="final-page">
      {/* Header Ad (always mounted) */}
      <div className="ad-header">
        <AdSlot
          id="ad-top-banner"
          keyId={bannerKey}
          width={320}
          height={50}
          onLoad={enqueueAd}
        />
      </div>

      <div className="content">
        <h1 className="title">🎉 Final Step</h1>
        <p className="subtitle">
          Unlock {slug} code below. Last verification to access 👇
        </p>

        {/* Inline Ad (always mounted) */}
        <div className="ad-inline">
          <AdSlot
            id="ad-in-article-1"
            keyId={inlineKey}
            width={300}
            height={250}
            onLoad={enqueueAd}
          />
        </div>

        {/* Verification */}
        <div className={`verify-box ${!started ? "show" : "hide"}`}>
          <p className="verify-text">
            Click below to start <b>10s verification</b>.
          </p>
          <button className="btn-dark" onClick={handleStart}>
            Start Verification
          </button>
        </div>

        <div
          className={`verify-box ${started && countdown > 0 ? "show" : "hide"}`}
        >
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

        <div
          className={`verify-box ${
            started && countdown === 0 && !unlocked ? "show" : "hide"
          }`}
        >
          <p className="verify-text success">Verification complete ✅</p>
          <p className="scroll-hint">Scroll down to Access code</p>
        </div>

        {/* Continue Section (controlled by CSS not conditional mount) */}
        <div
          className={`continue-section ${
            countdown === 0 && !unlocked ? "show" : "hide"
          }`}
        >
          {continueClicks === 0 ? (
            <button className="btn-primary" onClick={handleContinue}>
              Get My Code ➡️
            </button>
          ) : (
            <div className="continue-real">
              <div className="hint">
                Thanks — click again to reveal your code.
              </div>
              <button
                className="btn-success"
                onClick={handleContinue}
                disabled={loading}
              >
                {loading ? "Loading..." : "Unlock Code 🔓"}
              </button>
            </div>
          )}
        </div>

        {/* Revealed content */}
        <div
          id="real-content"
          className={`hidden-content ${unlocked ? "show" : "hide"}`}
        >
          <h2>✅ Your Code is Ready</h2>

          {error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <p>Copy your code below and use it instantly:</p>
              <div className="code-actions">
                <div className="code-box">{code || "No code"}</div>
                <button
                  className="btn-primary copy-btn"
                  onClick={handleCopyCode}
                >
                  {copied ? "Copied ✔" : "Copy Code"}
                </button>
              </div>
              {copyErr && <p className="copy-error">{copyErr}</p>}

              {/* Ad near code (always mounted, hidden until unlocked) */}
              <div className="ad-inline">
                <AdSlot
                  id="ad-in-article-2"
                  keyId={inlineKey}
                  width={300}
                  height={250}
                  onLoad={enqueueAd}
                />
              </div>

              <p>
                Need help? <a href="/support">Contact Support</a>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Sticky Ad (always mounted) */}
      <div className="sticky-ad">
        <AdSlot
          id="ad-sticky-bottom"
          keyId={bannerKey}
          width={320}
          height={50}
          onLoad={enqueueAd}
        />
      </div>
    </div>
  );
};

export default Page3;
