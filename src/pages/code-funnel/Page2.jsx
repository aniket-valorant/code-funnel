import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Styles/ArticlePage1.css"; // reuse same styles
import AdSlot from "../../components/adslot/AdSlot";

export default function Page2() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [continueClicks, setContinueClicks] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const adQueueRef = useRef([]);

  const handleStart = () => !started && setStarted(true);

  useEffect(() => {
    if (!started || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [started, countdown]);

  useEffect(() => {
    if (countdown === 0 && started) setShowContinue(true);
  }, [countdown, started]);

  const handleContinue = () => {
    if (continueClicks === 0) {
      window._pu?.show?.();
      setContinueClicks(1);
      return;
    }
    navigate(`/a/${slug}/complete`);
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

  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7";
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd";

  return (
    <div className="article-page">
      {/* Top banner */}
      <header className="container">
        <AdSlot
          id="ad-top-banner"
          keyId={bannerKey}
          width={320}
          height={50}
          onLoad={enqueueAd}
        />
      </header>

      <main className="container">
        <article className="post">
          <h1 className="title">10 Amazing Hill Stations in India 🏞️</h1>
          <p className="meta">12 min read · Curated by TravelExplorer</p>

          <p>
            Escape the city heat and explore India’s most serene hill stations.
            From misty valleys to scenic viewpoints, these locations promise
            tranquility and adventure for every traveler.
          </p>

          {/* Verification */}
          {!started ? (
            <div className="verify-box">
              <p>
                Want {slug} code?  start last quick verification to unlock.
              </p>
              <button onClick={handleStart}>Start Verification</button>
            </div>
          ) : countdown > 0 ? (
            <div className="verify-box">
              <p>
                Verifying your access… <b>{countdown}s</b>{" "}remaining
              </p>
              <div
                className="progress-bar"
                style={{
                  width: `${Math.round(((10 - countdown) / 10) * 100)}%`,
                }}
              />
            </div>
          ) : (
            <div className="verify-box">
              <p>To get <b>{slug}</b> code, scroll down to the Continue button</p><b>Final Step</b>
            </div>
          )}

          {/* Inline Ad */}
          <AdSlot
            id="ad-in-article-1"
            keyId={inlineKey}
            width={300}
            height={250}
            onLoad={enqueueAd}
          />

          <h2>1. Shimla, Himachal Pradesh</h2>
          <p>
            The capital city of Himachal Pradesh, Shimla is known for its colonial charm,
            bustling mall road, and scenic viewpoints. Enjoy toy train rides and cozy cafes.
          </p>

          <h2>2. Manali, Himachal Pradesh</h2>
          <p>
            Nestled in the Kullu Valley, Manali is perfect for adventure lovers. Trekking, paragliding, and river rafting are popular activities.
          </p>

          <h2>3. Darjeeling, West Bengal</h2>
          <p>
            Famous for its tea gardens and the Himalayan Railway, Darjeeling offers spectacular sunrise views over Mount Kanchenjunga.
          </p>

          {/* Inline Ad */}
          <AdSlot
            id="ad-in-article-2"
            keyId={inlineKey}
            width={300}
            height={250}
            onLoad={enqueueAd}
          />

          <h2>4. Munnar, Kerala</h2>
          <p>
            Surrounded by tea plantations and rolling hills, Munnar is ideal for nature lovers and photographers.
          </p>

          <h2>5. Ooty, Tamil Nadu</h2>
          <p>
            The “Queen of Hill Stations,” Ooty is famous for its botanical gardens, serene lakes, and charming Nilgiri hills.
          </p>

          <h2>6. Coorg, Karnataka</h2>
          <p>
            Also known as Kodagu, Coorg is known for coffee plantations, waterfalls, and trekking trails through lush forests.
          </p>

          {/* Inline Ad */}
          <AdSlot
            id="ad-in-article-3"
            keyId={inlineKey}
            width={300}
            height={250}
            onLoad={enqueueAd}
            />
            {showContinue && (
              <section>
                <p><b>Press Continue to proceed</b></p>
                {continueClicks === 0 ? (
                  <button onClick={handleContinue}>Continue</button>
                ) : (
                  <div>
                    <button onClick={handleContinue}>Continue</button>
                  </div>
                )}
              </section>
            )}

          <h2>7. Mount Abu, Rajasthan</h2>
          <p>
            The only hill station in Rajasthan, Mount Abu offers lakes, temples, and panoramic sunset points.
          </p>

          <h2>8. Mussoorie, Uttarakhand</h2>
          <p>
            Known as the “Queen of Hills,” Mussoorie offers scenic viewpoints, waterfalls, and a relaxed hill vibe.
          </p>

          <h2>9. Kasauli, Himachal Pradesh</h2>
          <p>
            A quaint hill town with colonial-era charm, quiet trails, and scenic sunsets over the valley.
          </p>

          <h2>10. Nainital, Uttarakhand</h2>
          <p>
            Famous for its beautiful lake, Nainital combines adventure, shopping, and stunning hill views.
          </p>

          {/* Continue button */}
        </article>
      </main>

      {/* Sticky bottom banner */}
      <div className="sticky">
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
}
