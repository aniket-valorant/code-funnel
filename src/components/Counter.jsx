export default function Counter({ seconds }) {
  return (
    <div className="counter">
      <div className="bubble">{seconds}</div>
      <div className="label">seconds left</div>
    </div>
  );
}
