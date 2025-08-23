import { Link, useNavigate, useParams } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import useCodeMeta from "../hooks/useCodeMeta";
import AdBanner from "../components/AdBanner";
import AffiliateBox from "../components/AffiliateBox";
import Counter from "../components/Counter";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function LandingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { meta, loading, error } = useCodeMeta(slug);

  // First timer (e.g., 8s)
  const { seconds, isDone } = useCountdown(8);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={error} />;
  if (!meta?.active) return <ErrorMessage msg="This code is inactive." />;

  return (
    <div className="page">
      <h1 className="title">{meta?.title || "Landing Page"}</h1>
      <p className="desc">{meta?.description || "Follow the steps below to get the code."}</p>

      <AdBanner slot="landing-top" height={120} />

      <div className="card">
        <h2>Step 1 — Stay on this page</h2>
        <p>Watch the timer. The Next button unlocks after it finishes.</p>
        <Counter seconds={seconds} />
        <button
          className="primary"
          disabled={!isDone}
          onClick={() => navigate(`/c/${slug}/wait`)}
          title={!isDone ? "Wait for timer" : "Go to step 2"}
        >
          {isDone ? "Go to Step 2" : "Please wait..."}
        </button>
        <div className="fake-note">Note: Clicking early won’t work 😉</div>
      </div>

      <AdBanner slot="landing-bottom" height={250} />

      <AffiliateBox onClick={() => alert("Hook to your membership/checkout")} />

      <div className="bottom-links">
        <Link to={`/c/${slug}/final`}>Skip to Final (debug)</Link>
      </div>
    </div>
  );
}
