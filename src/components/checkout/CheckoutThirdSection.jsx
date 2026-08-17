import "./checkoutThirdSection.css";
export default function CheckoutThirdSection() {
  return (
    <>
      <section className="cart-third-sec">
        <div className="form-container">
          <form id="checkout-form">
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
                  />
                </div>
              </div>
              <div className="input-label-con">
                <small>Order Notes (Optional)</small>
                <textarea
                  name="note"
                  placeholder="Order note"
                  id="order-note"
                ></textarea>
              </div>
            </div>
            <div className="payment-method-con">
              <div className="checkout-panel-title">
                <img
                  src="./images/cart/secondSection/credit-card.svg"
                  alt="credit-card-icon"
                  className="checkout-icon"
                />
                <span>3. Payment Method</span>
              </div>
              <div id="payment-message" className="payment-message"></div>
              <div>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    value="paypal"
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
                <div className="paypal-container">
                  <div id="paypal-button-container"></div>
                  <p id="result-message"></p>
                </div>
              </div>
              <div>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="cashOnDelivery"
                    value="cash-on-delivery"
                  />
                  <span>Cash on Delivery</span>
                  <div className="payment-card-con">
                    <img
                      src="./images/cart/firstSection/money-cash.svg"
                      alt="cash"
                    />
                  </div>
                </label>
                <div className="cash-on-delivery-btn-con">
                  <button id="place-order-btn" type="button">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
