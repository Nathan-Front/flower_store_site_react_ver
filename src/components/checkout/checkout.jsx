import CheckoutFirstSection from "./CheckoutFirstSection.jsx";
import CheckoutSecondSection from "./CheckoutSecondSection.jsx";
import CheckoutThirdSection from "./CheckoutThirdSection.jsx";
import { useState } from "react";
import "./checkoutFirstSection.css";
export default function Checkout({ updateCart, cartItems }) {
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  return (
    <div className="checkout-page">
      <CheckoutFirstSection />
      <CheckoutSecondSection
        updateCart={updateCart}
        checkoutProducts={checkoutProducts}
        setCheckoutProducts={setCheckoutProducts}
      />
      <CheckoutThirdSection
        cartItems={cartItems}
        checkoutProducts={checkoutProducts}
      />
    </div>
  );
}
