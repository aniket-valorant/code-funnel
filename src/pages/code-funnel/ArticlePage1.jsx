import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Styles/ArticlePage1.css";

export default function ArticlePage1() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // monetization flow
  const [started, setStarted] = useState(false); // user started the 10s verification
  const [countdown, setCountdown] = useState(3); // 10-second timer
  const [continueClicks, setContinueClicks] = useState(0); // 0 = fake, 1 = real
  const [showContinue, setShowContinue] = useState(false);
  // OPTIONAL: hook your ad network’s click/open here
  const openAdPopup = () => {
    // Example placeholders:
    // window._pu && window._pu.show();
    window.open("about:blank", "_blank", "noopener");
  };

  // start verification
  const handleStart = () => {
    if (!started) setStarted(true);
  };

  // countdown tick
  useEffect(() => {
    if (!started || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [started, countdown]);

  // once finished reveal continue button

  useEffect(() => {
    if (countdown === 0 && started) {
      setShowContinue(true);
    }
  }, [countdown, started]);

  // continue button logic (fake → real)
  const handleContinue = () => {
    if (continueClicks === 0) {
      openAdPopup(); // fake click triggers an ad
      setContinueClicks(1);
      return;
    }
    // real continue: go to Page 2
    navigate(`/a/${slug}/2`); // or navigate(`/a/${slug}/2`) if you build that route next
  };

  return (
    <div className="article-page">
      {/* Top banner ad */}
      <header className="container">
        <div className="ad-label">Advertisement</div>
        <div id="ad-top-banner" className="ad-box h-90">
          <span>Top Banner Ad</span>
        </div>
      </header>

      <main className="container">
        <article className="post">
          <h1 className="title">
            Top 7 Hidden Travel Spots in India (Don’t Miss #5!)
          </h1>
          <p className="meta">5 min read · Curated by TravelRadar</p>

          {/* --- START VERIFICATION BUTTON (ABOVE CONTENT) --- */}
          {!started ? (
            <div className="verify-box">
              <p className="verify-text">
                Click below to start <b>verification</b>.
              </p>
              <button className="btn btn-dark" onClick={handleStart}>
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

          {/* In-article ad #1 */}
          <div className="ad-in-article">
            <div className="ad-label">Advertisement</div>
            <div id="ad-in-article-1" className="ad-box h-250">
              <span>In-Article Ad</span>
            </div>
          </div>

          <p>
            India is packed with famous sights, but some of the country’s most
            magical places hide off the typical tourist trail. If you love quiet
            valleys, mirror-still lakes, and villages where time moves slow,
            this list is for you.
          </p>
          <p>
            The best part? Most of these gems are perfect for a long weekend and
            won’t crush your budget. From high-altitude meadows to emerald
            beaches, let’s discover the spots locals whisper about.
          </p>

          {/* In-article ad #2 */}
          <div className="ad-in-article">
            <div className="ad-label">Advertisement</div>
            <div id="ad-in-article-2" className="ad-box h-250">
              <span>In-Article Ad</span>
            </div>
          </div>

          <h2>Ziro Valley, Arunachal Pradesh</h2>
          <p>
            Pine-clad hills, rice fields like green quilts, and the gentle
            rhythm of Apatani village life. Ziro is a slow traveler’s
            dream—music festivals in autumn and misty mornings year-round.
          </p>

          <h2>Gokarna’s Secret Coves, Karnataka</h2>
          <p>
            Skip the main beach and trek to Paradise, Half-Moon, and Om’s
            quieter corners. Golden sand, clean water, and cliffside sunsets
            without the Goa rush.
          </p>

          <h2>Mechuka, Arunachal Pradesh</h2>
          <p>
            A valley wrapped in snow peaks with wooden homes, hanging bridges,
            and crystal streams. Go before everyone else does.
          </p>

          {/* In-article ad #3 */}
          <div className="ad-in-article">
            <div className="ad-label">Advertisement</div>
            <div id="ad-in-article-3" className="ad-box h-250">
              <span>In-Article Ad</span>
            </div>
          </div>

          <h2>Bangaram Island, Lakshadweep</h2>
          <p>
            A ring of turquoise so clear it looks photoshopped. Snorkel gardens,
            silent nights, and stars like powdered sugar spilled across the sky.
          </p>

          {/* --- CONTINUE BUTTON ONLY AFTER VERIFICATION --- */}

          {showContinue && (
            <section className="verify">
              {continueClicks === 0 ? (
                <button className="btn btn-primary" onClick={handleContinue}>
                  Continue
                </button>
              ) : (
                <div className="continue-real">
                  <div className="hint">Thanks — click again to proceed.</div>
                  <button className="btn btn-success" onClick={handleContinue}>
                    Continue (Real)
                  </button>
                </div>
              )}
            </section>
          )}
        </article>
      </main>

      {/* Sticky bottom banner */}
      <div className="sticky">
        <div className="ad-label">Advertisement</div>
        <div id="ad-sticky-bottom" className="ad-box h-60">
          <span>Sticky Bottom Banner</span>
        </div>
      </div>
    </div>
  );
}
