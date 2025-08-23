export default function ErrorMessage({ msg = "Something went wrong." }) {
  return <div className="error">{msg}</div>;
}
