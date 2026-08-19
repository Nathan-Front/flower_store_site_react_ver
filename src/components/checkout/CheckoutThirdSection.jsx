import "./checkoutThirdSection.css";
import { useState, useRef, useEffect, useContext } from "react";
import PaypalButton from "../paypalButton/PaypalButton.jsx";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import { OverlayContext } from "../loadingComponent/OverlayContext.jsx";
import Overlay from "../loadingComponent/Overlay.jsx";
export default function CheckoutThirdSection({
  cartItems,
  checkoutProducts,
  dataSettings,
  setCheckoutProducts,
}) {
  const [isPaypal, setPaypal] = useState("");
  const [isSetPayment, setPayment] = useState(false);
  const radioBtnHandler = (payment) => {
    if (payment === "paypal") {
      setPayment(payment);
      setPaypal("paypal");
    } else {
      setPayment(payment);
      setPaypal("COD");
    }
  };
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    date: "",
    time: "",
    note: "",
  };

  const [isInput, setIsInput] = useState(initialForm);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setIsInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Create a ref to store live form and payment data
  const formDataRef = useRef({
    customer: isInput,
    paymentMethod: isSetPayment,
  });

  // Update ref whenever state changes
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    formDataRef.current = {
      customer: isInput,
      paymentMethod: isSetPayment,
    };
  }, [isInput, isSetPayment]);

  const dataParams = {
    cart: checkoutProducts,
    customer: isInput,
    paymentMethod: isPaypal,
  };

  //enable/disable whole form container
  useEffect(() => {
    if (!formRef.current) return;

    const hasItems = checkoutProducts.length > 0;
    const hasLoaded = dataSettings.length > 0;
    const canEnableForm = hasItems && hasLoaded;
    formRef.current.classList.toggle("form-disabled", !canEnableForm); //hasItems true = remove form-disabled, false = add form-disabled
    //get all form elements and disable them if cart is empty
    /* [...formRef.current.elements].forEach((element) => {
      element.disabled = !canEnableForm;
    }); */
  }, [checkoutProducts, dataSettings]);

  //enable/disable payment method container
  useEffect(() => {
    if (!formRef.current) return;

    setIsFormValid(formRef.current.checkValidity());
  }, [isInput]);
  const canSelectPayment =
    checkoutProducts.length > 0 && dataSettings.length > 0 && isFormValid;

  //overlay and spinner
  const { setIsOpen, setSpinner } = useContext(OverlayContext);

  const [orderResult, setOrderResult] = useState(null);

  //hadnler for COD since we dont do like paypal button
  const handleCODOrder = async () => {
    if (!formRef.current?.checkValidity()) {
      console.log("Form is invalid");
      return;
    }
    try {
      setIsOpen(true);
      setSpinner("COD");
      const response = await fetch(
        "https://flower-store-site-react-ver.onrender.com/api/orders/cod", //hard code the backend since paypalbutton is separated
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataParams),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to place COD order.");
      }
      const result = await response.json();

      setOrderResult(result);
      console.log("COD RESULT:", result);
    } catch (error) {
      console.error("Failed to place COD order:", error);
      throw error;
    } finally {
      setIsOpen(false);
      setSpinner(null);
    }
  };

  return (
    <>
      <section className="cart-third-sec">
        <div className="form-container">
          <form id="checkout-form" ref={formRef}>
            <div className="contact-info-con">
              <div className="checkout-panel-title">
                <img
                  src="./images/cart/secondSection/person.svg"
                  alt="person-icon"
                  className="checkout-icon"
                />
                <span>1. Contact Information</span>
              </div>
              <div className="input-label-con">
                <label htmlFor="checkoutEmail">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="checkoutEmail"
                  placeholder="Your email@example.com"
                  required
                  onChange={inputHandler}
                />
              </div>
              <div className="input-label-con">
                <label htmlFor="checkoutPhone">Contact Number</label>
                <input
                  type="text"
                  name="phone"
                  id="checkoutPhone"
                  placeholder="09XX XXXX XXXX"
                  required
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className="shipping-info-con">
              <div className="checkout-panel-title">
                <img
                  src="./images/cart/secondSection/location-pin.svg"
                  alt="location-pin-icon"
                  className="checkout-icon"
                />
                <span>2. Shipping Information</span>
              </div>
              <div className="input-label-con">
                <label htmlFor="checkoutName">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="checkoutName"
                  placeholder="John Doe"
                  required
                  onChange={inputHandler}
                />
              </div>
              <div className="input-label-con">
                <label htmlFor="checkoutAddress">Address</label>
                <input
                  type="text"
                  name="address"
                  id="checkoutAddress"
                  placeholder="Street, block, building, house number"
                  required
                  onChange={inputHandler}
                />
              </div>
              <div className="shipping-inner-con">
                <div className="input-label-con">
                  <label htmlFor="checkoutCity">City</label>
                  <input
                    type="text"
                    name="city"
                    id="checkoutCity"
                    placeholder="City"
                    required
                    onChange={inputHandler}
                  />
                </div>
                <div className="input-label-con">
                  <label htmlFor="checkoutZip">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    id="checkoutZip"
                    placeholder="Zip code"
                    required
                    onChange={inputHandler}
                  />
                </div>
                <div className="input-label-con">
                  <label htmlFor="checkoutDate">Delivery Date</label>
                  <input
                    type="date"
                    name="date"
                    id="checkoutDate"
                    placeholder="Select delivery date"
                    required
                    onChange={inputHandler}
                  />
                </div>
                <div className="input-label-con">
                  <label htmlFor="checkoutTime">Delivery Time</label>
                  <input
                    type="time"
                    name="time"
                    id="checkoutTime"
                    placeholder="Select desired time"
                    required
                    onChange={inputHandler}
                  />
                </div>
              </div>
              <div className="input-label-con">
                <small>Order Notes (Optional)</small>
                <textarea
                  name="note"
                  placeholder="Order note"
                  id="order-note"
                  onChange={inputHandler}
                ></textarea>
              </div>
            </div>
            <fieldset
              className="payment-method-con"
              disabled={!canSelectPayment}
            >
              <div className="checkout-panel-title">
                <img
                  src="./images/cart/secondSection/credit-card.svg"
                  alt="credit-card-icon"
                  className="checkout-icon"
                />
                <span>3. Payment Method</span>
              </div>
              <div id="payment-message" className="payment-message">
                {isFormValid
                  ? ""
                  : "Please complete all required fields before placing an order."}
              </div>
              <div>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    value="paypal"
                    onChange={() => radioBtnHandler("paypal")}
                  />
                  <span>PayPal</span>
                  <div className="payment-card-con">
                    <img
                      src="./images/cart/firstSection/paypal.svg"
                      alt="paypal"
                    />
                    <img src="./images/cart/firstSection/visa.svg" alt="visa" />
                    <img
                      src="./images/cart/firstSection/mastercard.svg"
                      alt="mastercard"
                    />
                  </div>
                </label>
                {isPaypal === "paypal" && isFormValid && (
                  <div className="paypal-container showPayment">
                    <div id="paypal-button-container"></div>
                    <PaypalButton
                      formDataRef={formDataRef}
                      dataParams={dataParams}
                      formRef={formRef}
                      onOrderComplete={setOrderResult}
                    />
                    <p id="result-message"></p>
                  </div>
                )}
              </div>
              <div>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="cashOnDelivery"
                    value="cash-on-delivery"
                    onChange={() => radioBtnHandler("COD")}
                  />
                  <span>Cash on Delivery</span>
                  <div className="payment-card-con">
                    <img
                      src="./images/cart/firstSection/money-cash.svg"
                      alt="cash"
                    />
                  </div>
                </label>
                {isPaypal === "COD" && isFormValid && (
                  <div className="cash-on-delivery-btn-con showCODbtn">
                    <button
                      id="place-order-btn"
                      type="button"
                      onClick={handleCODOrder}
                    >
                      Place Order
                    </button>
                  </div>
                )}
              </div>
            </fieldset>
          </form>
        </div>
      </section>
      {orderResult && (
        <Overlay
          type="success"
          paypal={orderResult.type}
          orderResult={orderResult}
          onClose={() => setOrderResult(null)}
        />
      )}
    </>
  );
}
