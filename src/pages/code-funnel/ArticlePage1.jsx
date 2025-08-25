import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Styles/ArticlePage1.css";
import AdSlot from "../../components/adslot/AdSlot";
import PopunderAd from "../../components/popunderAd/PopunderAd";

export default function ArticlePage1() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Verification states
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [continueClicks, setContinueClicks] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  // Ad queue refs
  const adQueueRef = useRef([]);

  // Start verification
  const handleStart = () => !started && setStarted(true);

  // Countdown
  useEffect(() => {
    if (!started || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [started, countdown]);

  useEffect(() => {
    if (countdown === 0 && started) setShowContinue(true);
  }, [countdown, started]);

  // Queue system for ads
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

  // Your ad keys
  const bannerKey = "c2b2533e7be1f40efc683cff33e98ae7"; // 300x50
  const inlineKey = "f0fb375a70e618a337898e0611ab95dd"; // 300x250
  const popunderScript = "//pl27499555.profitableratecpm.com/60/64/83/60648330d5724422f8d3884cae900cd4.js";

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
          <h1 className="title">Top 7 Hidden Travel Spots in India</h1>
          <p className="meta">10 min read · Curated by TravelRadar</p>

          <p>
            India is packed with famous sights, but some of the country’s most
            magical places remain hidden off the tourist trail. If you love
            quiet valleys, mirror-still lakes, and villages where time moves
            slow, this list is for you.
          </p>

          {/* Verification */}
          {!started ? (
            <div className="verify-box">
              <p>
                 Get {slug} code? Click below to start
              </p>
              <button onClick={handleStart}>Start Verification</button>
            </div>
          ) : countdown > 0 ? (
            <div className="verify-box">
              <p>
                ⏳ Almost there! Verifying your access… <b>{countdown}s</b>{" "}
                remaining
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
              <p>To get <b>{slug}</b> code</p>
              <p>
                Scroll down to <b> Continue </b> button
              </p>
            </div>
          )}

          {/* Inline Ad 1 */}
          <AdSlot
            id="ad-in-article-1"
            keyId={inlineKey}
            width={300}
            height={250}
            onLoad={enqueueAd}
          />
          <p>
            From high-altitude meadows to emerald beaches, these destinations
            let you experience India the way locals do—peaceful, scenic, and
            full of surprises.
          </p>

          <h2>Ziro Valley, Arunachal Pradesh</h2>
          <p>
            A valley tucked between pine-clad hills, Ziro offers a serene
            escape. Wander through Apatani tribal villages, enjoy misty
            mornings, and attend the vibrant Ziro Music Festival in autumn.
          </p>

          <h2>Gokarna’s Secret Coves, Karnataka</h2>
          <p>
            Skip crowded Goa beaches and trek to hidden coves like Paradise and
            Half-Moon. Golden sand, turquoise waters, and breathtaking sunsets
            await the mindful traveler.
          </p>

          <h2>Mechuka, Arunachal Pradesh</h2>
          <p>
            Snow-capped peaks, hanging bridges, and crystal-clear streams define
            this secluded valley. Visit before the crowds and witness pristine
            landscapes in their untouched glory.
          </p>

          <h2>Bangaram Island, Lakshadweep</h2>
          <p>
            A tropical paradise with pristine coral reefs, powdery beaches, and
            sparkling turquoise waters. Snorkel, dive, or simply relax under the
            stars with the soothing sound of waves.
          </p>

          <h2>Majuli, Assam</h2>
          <p>
            The world’s largest river island, Majuli is a cultural haven.
            Explore Satras (monasteries), observe traditional mask-making, and
            witness vibrant festivals celebrating local art and religion.
          </p>

          <h2>Chopta Valley, Uttarakhand</h2>
          <p>
            Often called “Mini Switzerland,” Chopta is the trekking base for
            Tungnath and Chandrashila peaks. Rhododendron forests, alpine
            meadows, and snow-capped panoramas greet every hiker.
          </p>

          {/* Inline Ad 2 */}
          <AdSlot
            id="ad-in-article-2"
            keyId={inlineKey}
            width={300}
            height={250}
            onLoad={enqueueAd}
          />
          <h2>Tawang, Arunachal Pradesh</h2>
          <p>
            Home to one of India’s largest monasteries, Tawang offers serene
            lakes, high-altitude landscapes, and a deep dive into Buddhist
            culture in the lap of the Himalayas.
          </p>

          <h2>Hampi, Karnataka</h2>
          <p>
            An ancient city of giant boulders, rivers, and mysterious ruins.
            Hampi’s landscapes are otherworldly, best explored during sunrise or
            away from the tourist throngs.
          </p>

          <h2>Spiti Valley, Himachal Pradesh</h2>
          <p>
            A desert high in the Himalayas, Spiti combines ancient monasteries,
            rugged roads, and breathtaking views. Ideal for adventure seekers
            and photographers seeking raw landscapes.
          </p>

          {/* Inline Ad 3 */}
          <AdSlot
            id="ad-in-article-3"
            keyId={inlineKey}
            width={300}
            height={250}
            onLoad={enqueueAd}
          />
          <h2>Khajuraho, Madhya Pradesh</h2>
          <p>
            Known for its intricately carved temples, Khajuraho is a quiet
            cultural escape. Explore step wells, local villages, and learn about
            ancient Indian architecture in a peaceful setting.
          </p>

          <h2>Patan, Gujarat</h2>
          <p>
            Famous for its step-wells and vibrant textile craft, Patan offers a
            rich cultural experience. Discover history, art, and architecture
            far from crowded tourist trails.
          </p>

          {/* Continue button */}
          {showContinue && (
            <section className="continue-section">
              <p><b>Press Continue button to proceed</b></p>
              <button
                onClick={() => navigate(`/a/${slug}/verify`)}
              >
                Continue
              </button>
              {/* <PopunderAd
                scriptSrc={popunderScript}
                onTrigger={() => navigate(`/a/${slug}/verify`)}
                buttonText="Continue"
              /> */}
            </section>
          )}
          <h2>Velas, Maharashtra</h2>
          <p>
            A serene coastal village where Olive Ridley turtles nest. Witness
            the hatchlings make their journey to the sea—a magical natural
            spectacle few places can offer.
          </p>
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
