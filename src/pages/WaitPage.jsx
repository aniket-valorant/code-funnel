import { useNavigate, useParams } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import useCodeMeta from "../hooks/useCodeMeta";
import { revealCode } from "../api";
import AdBanner from "../components/AdBanner";
import Counter from "../components/Counter";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function WaitPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { meta, loading, error } = useCodeMeta(slug);
  const { seconds, isDone } = useCountdown(12); // second timer

  async function handleReveal() {
    try {
      const data = await revealCode(slug);
      // persist so FinalPage can read even on refresh
      sessionStorage.setItem(`code:${slug}`, JSON.stringify(data));
      navigate(`/c/${slug}/final`);
    } catch (err) {
      alert(err?.response?.data?.error || "Reveal failed. Try again in a bit.");
    }
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={error} />;

  return (
    <div className="page">
      <h1 className="title">Step 2 — Watch & Wait</h1>

      <AdBanner slot="wait-top" height={120} />

      <div className="card">
        <h2>Watch this short clip</h2>
        <div className="video">
          {/* Replace with your actual video/embed */}
          <iframe
            title="promo"
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <Counter seconds={seconds} />
        <button className="primary" disabled={!isDone} onClick={handleReveal}>
          {isDone ? "Reveal Code" : "Please wait..."}
        </button>
      </div>

      <AdBanner slot="wait-bottom" height={250} />
    </div>
  );
}
