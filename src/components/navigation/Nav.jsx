import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { OverlayContext } from "../loadingComponent/OverlayContext";
import Cart from "../cart/Cart";
export default function Nav() {
  const [cartOpen, setCartOpen] = useState(false);
  const { setIsOpen } = useContext(OverlayContext);

  const openCartHandler = () => {
    setCartOpen(true);
    setIsOpen(true);
  };
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
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <button className="cart-button" onClick={() => openCartHandler()}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">0</span>
        </button>
        <button className="menu-btn" aria-label="menu-button">
          <i className="fa-solid fa-bars" id="menu-icon"></i>
        </button>
      </nav>
      <Cart
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
