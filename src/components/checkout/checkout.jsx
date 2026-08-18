import CheckoutFirstSection from "./checkoutFirstSection.jsx";
import CheckoutSecondSection from "./CheckoutSecondSection.jsx";
import CheckoutThirdSection from "./CheckoutThirdSection.jsx";
import "./checkoutFirstSection.css";
export default function Checkout({ updateCart }) {
  return (
    <div className="checkout-page">
      <CheckoutFirstSection />
      <CheckoutSecondSection updateCart={updateCart} />
      <CheckoutThirdSection />
    </div>
  );
}
