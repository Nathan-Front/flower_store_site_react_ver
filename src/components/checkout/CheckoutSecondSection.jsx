import "./checkoutSecondSection.css";
import { useLocation } from "react-router-dom";
import { formatPrice } from "../hooks/productPriceFormat.jsx";
export default function CheckoutSecondSection() {
  const location = useLocation();
  const buyNow = location.state?.buyNow;
  const item = location.state?.item;
  const quantity = location.state?.quantity;
  const checkoutProducts = buyNow
    ? [{ ...item, quantity }]
    : JSON.parse(localStorage.getItem("temporaryCart")) || [];
  console.log(checkoutProducts);
  return (
    <>
      <section className="cart-second-sec">
        <div>
          <h3>Order Summary</h3>
          <div className="order-summary-message"></div>
          <ul className="cart-checkout-content">
            {checkoutProducts.map((item) => (
              <li data-product-id={item.no} key={item.no}>
                <div className="check-product-details-con">
                  <div className="check-cart-product-image">
                    <img
                      src={item.image}
                      alt="product-item-${product.item.no}"
                    />
                  </div>
                  <div className="check-cart-product-details">
                    <strong>{item.product}</strong>
                    <span>{formatPrice(item.price)}</span>
                    <div className="check-cart-add-minus-con">
                      <div className="check-quantity-con">
                        <span>Quantity:</span>
                      </div>
                      <button className="check-cart-minus-qty-btn">−</button>
                      <div className="check-cart-qty-display-con">
                        <span className="check-cart-qty-display">
                          {item.quantity}
                        </span>
                      </div>
                      <button className="check-cart-add-qty-btn">+</button>
                      <button className="cart-modal-del-btn">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <ul className="totals-con">
            <li>
              <span>Subtotal:</span>
              <span className="sub-total"></span>
            </li>
            <li>
              <span>Delivery Fee:</span>
              <span className="delivery-fee"></span>
            </li>
            <li>
              <span>Tax Fee:</span>
              <span className="tax-fee"></span>
            </li>
            <li>
              <span>Total:</span>
              <span className="grand-total"></span>
            </li>
          </ul>
          <div className="checkout-secure-con">
            <img
              src="./images/about/fifthSection/shield-check.svg"
              alt="secure-payment-icon"
            />
            <div className="checkout-secure-sub-con">
              <span>Secure Checkout</span>
              <p>Your payment information is 100% safe and secure.</p>
            </div>
          </div>
          <ul className="checkout-info-cards">
            <li>
              <img
                src="./images/about/fifthSection/truck.svg"
                alt="truck-icon"
              />
              <p>Same-day Delivery</p>
            </li>
            <li>
              <img
                src="./images/index/secondSection/flower-tulip-svgrepo-com.svg"
                alt="flower-icon"
              />
              <p>Fresh and Beautiful</p>
            </li>
            <li>
              <img
                src="./images/about/fifthSection/heart.svg"
                alt="with-love-icon"
              />
              <p>Made with Love</p>
            </li>
          </ul>
          <div className="checkout-help-con">
            <img
              src="./images/about/fifthSection/headphone.svg"
              alt="support-icon"
            />
            <div>
              <div className="help-con">
                <span>Need Help?</span>
                <p>We're here for you</p>
              </div>
              <div className="contact-con">
                <span>+1(000)123-4567</span>
                <span>hello@flosflorere.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
