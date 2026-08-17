import CheckoutFirstSection from "./checkoutFirstSection.jsx";
import CheckoutSecondSection from "./CheckoutSecondSection.jsx";
import CheckoutThirdSection from "./CheckoutThirdSection.jsx";
import "./checkoutFirstSection.css";
export default function Checkout() {
  return (
    <div className="checkout-page">
      <CheckoutFirstSection />
      <CheckoutSecondSection />
      <CheckoutThirdSection />
    </div>
  );
}
