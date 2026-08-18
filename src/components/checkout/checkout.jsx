import CheckoutFirstSection from "./CheckoutFirstSection.jsx";
import CheckoutSecondSection from "./CheckoutSecondSection.jsx";
import CheckoutThirdSection from "./CheckoutThirdSection.jsx";
import "./checkoutFirstSection.css";
export default function Checkout({ updateCart, cartItems }) {
  return (
    <div className="checkout-page">
      <CheckoutFirstSection />
      <CheckoutSecondSection updateCart={updateCart} />
      <CheckoutThirdSection cartItems={cartItems} />
    </div>
  );
}
