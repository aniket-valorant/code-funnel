import "./AffiliateCTA.css";

const AffiliateCTA = ({ url, text, color }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`affiliate-cta ${color === "red" ? "red" : "green"}`}
    >
      {text}
    </a>
  );
};

export default AffiliateCTA;
