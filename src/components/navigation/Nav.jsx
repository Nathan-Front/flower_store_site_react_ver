import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <>
      <nav>
        <div className="logo-container">
          <img src="./images/navigation/web-logo.webp" alt="web-logo" />
          <h1>
            Flos <span>&</span> Florere
          </h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="./shop.html">Shop</Link>
          </li>
          <li>
            <Link to="./about.html">About</Link>
          </li>
          <li>
            <Link to="./contact.html">Contact</Link>
          </li>
        </ul>
        <button className="cart-button">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">0</span>
        </button>
        <button className="menu-btn" aria-label="menu-button">
          <i className="fa-solid fa-bars" id="menu-icon"></i>
        </button>
      </nav>
    </>
  );
}
