import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { revealCode } from "../api";
import AdBanner from "../components/AdBanner";
import AffiliateBox from "../components/AffiliateBox";

export default function FinalPage() {
  const { slug } = useParams();
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);

  // read from sessionStorage; if missing (e.g., direct open), try to reveal
  useEffect(() => {
    const cached = sessionStorage.getItem(`code:${slug}`);
    if (cached) {
      setPayload(JSON.parse(cached));
      setLoading(false);
      return;
    }
    revealCode(slug)
      .then((data) => {
        setPayload(data);
        sessionStorage.setItem(`code:${slug}`, JSON.stringify(data));
      })
      .catch(() => setPayload({ code: null, shortenerUrl: null }))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="page">
      <h1 className="title">Final Page — Your Code</h1>

      <AdBanner slot="final-top" height={120} />

      <div className="card">
        {loading ? (
          <p>Fetching your code…</p>
        ) : payload?.code ? (
          <>
            <h2>Your Code</h2>
            <div className="code-box">{payload.code}</div>
            {payload.shortenerUrl ? (
              <a className="primary" href={payload.shortenerUrl} target="_blank" rel="noreferrer">
                Continue
              </a>
            ) : null}
            <p className="muted">Copy the code or tap Continue if visible.</p>
          </>
        ) : (
          <p>We couldn’t fetch your code. Please go back and try again.</p>
        )}
      </div>

      <AdBanner slot="final-middle" height={250} />
      <AffiliateBox title="Upgrade: Instant Reveal" cta="Go Premium" onClick={() => alert("Connect payment")} />

      <div className="bottom-links">
        <Link to={`/c/${slug}`}>Start Again</Link>
      </div>
    </div>
  );
}
