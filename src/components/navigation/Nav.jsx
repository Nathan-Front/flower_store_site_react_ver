import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { OverlayContext } from "../loadingComponent/OverlayContext";
import Cart from "../cart/Cart";
import { CartCount } from "../hooks/cartCount.js";
export default function Nav({ cartItems, updateCart }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { setIsOpen } = useContext(OverlayContext);

  const openCartHandler = () => {
    setCartOpen(true);
    setIsOpen(true);
  };
  let cartCnt = CartCount(cartItems); //pass to calculate total

  //burger button
  const [isSetBurger, setBurger] = useState(false);
  useEffect(() => {
    if (isSetBurger) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isSetBurger]);

  //close nav when link is clicked
  const closeBurger = () => {
    setBurger(false);
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
        <ul className={`nav-links ${isSetBurger ? "openNav" : ""}`}>
          <li>
            <Link to="/" onClick={closeBurger}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={closeBurger}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeBurger}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeBurger}>
              Contact
            </Link>
          </li>
        </ul>
        <button className="cart-button" onClick={() => openCartHandler()}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">{cartCnt}</span>
        </button>
        <button
          className="menu-btn"
          aria-label="menu-button"
          onClick={() => setBurger((prev) => !prev)}
        >
          <i
            className={`fa-solid ${!isSetBurger ? "fa-bars" : "fa-xmark"}`}
            id="menu-icon"
          ></i>
        </button>
      </nav>
      <Cart
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        setIsOpen={setIsOpen}
        cartItems={cartItems}
        updateCart={updateCart}
      />
    </>
  );
}
