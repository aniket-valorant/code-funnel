// components/AdComponent.jsx
const AdComponent = ({ containerId, minHeight = "50px" }) => {
  return (
    <div
      id={containerId}
      style={{ width: "100%", textAlign: "center", minHeight }}
    />
  );
};

export default AdComponent;
