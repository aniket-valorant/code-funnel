export default function AdBanner({ slot = "top", height = 90 }) {
  return (
    <div
      className="ad-banner"
      style={{
        height,
        display: "grid",
        placeItems: "center",
        border: "1px dashed #bbb",
        background: "#fffdf3",
        borderRadius: 12,
      }}
    >
      {/* Replace with your ad network snippet */}
      <span>Ad Slot: {slot}</span>
    </div>
  );
}
