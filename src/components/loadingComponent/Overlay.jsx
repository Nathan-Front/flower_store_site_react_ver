export default function Overlay({ type }) {
  return (
    <div className="overlay">
      {type === "loading" && <span className="overlay-spinner"></span>}
    </div>
  );
}
