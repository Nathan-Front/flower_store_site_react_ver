import CheckoutFirstSection from "./CheckoutFirstSection.jsx";
import CheckoutSecondSection from "./CheckoutSecondSection.jsx";
import CheckoutThirdSection from "./CheckoutThirdSection.jsx";
import { useState } from "react";
import "./checkoutFirstSection.css";
import useFetch from "../hooks/renderFetchData.js";
import { formatCartDisplay } from "../hooks/dataFormatter.js";
export default function Checkout({ updateCart }) {
  const {
    data: dataSettings, //rename the data and render its contents
    loading,
    error,
  } = useFetch("checkout", "settings", formatCartDisplay);
  const [checkoutProducts, setCheckoutProducts] = useState([]);

  return (
    <div className="checkout-page">
      <CheckoutFirstSection />
      <CheckoutSecondSection
        updateCart={updateCart}
        dataSettings={dataSettings}
        loading={loading}
        error={error}
        checkoutProducts={checkoutProducts}
        setCheckoutProducts={setCheckoutProducts}
      />
      <CheckoutThirdSection
        checkoutProducts={checkoutProducts}
        dataSettings={dataSettings}
        setCheckoutProducts={setCheckoutProducts}
        updateCart={updateCart}
      />
    </div>
  );
}
