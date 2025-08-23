export default function AffiliateBox({ title = "Become a Member", cta = "Upgrade Now", onClick }) {
  return (
    <div className="affiliate-box">
      <h3>{title}</h3>
      <p>Unlock faster access, no timers, and premium codes.</p>
      <button onClick={onClick}>{cta}</button>
    </div>
  );
}
