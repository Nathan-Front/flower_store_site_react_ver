import "./checkoutSecondSection.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { formatPrice } from "../hooks/productPriceFormat.jsx";
import useFetch from "../hooks/renderFetchData.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import { formatCartDisplay } from "../hooks/dataFormatter.js";

export default function CheckoutSecondSection({
  updateCart,
  checkoutProducts,
  setCheckoutProducts,
}) {
  const {
    data: dataSettings, //rename the data and render its contents
    loading,
    error,
  } = useFetch("checkout", "settings", formatCartDisplay);
  const location = useLocation();
  const buyNow = location.state?.buyNow;
  const item = location.state?.item;
  const quantity = location.state?.quantity;

  //select which storage to be rendered
  useEffect(() => {
    if (buyNow && quantity) {
      const timer = setTimeout(() => {
        setCheckoutProducts([
          {
            item: item,
            quantity: quantity,
          },
        ]);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      const temporaryCart =
        JSON.parse(localStorage.getItem("temporaryCart")) || [];
      const timer = setTimeout(() => {
        setCheckoutProducts(temporaryCart);
      });
      return () => clearTimeout(timer);
    }
  }, [buyNow, item, quantity]);

  const subTotal = checkoutProducts.reduce(
    (total, product) => total + product.item.price * product.quantity,
    0,
  );

  let grandTotal =
    dataSettings.length > 0 //render only when data is already fetched
      ? Number(subTotal) * dataSettings[0].taxRate +
        Number(subTotal) +
        dataSettings[0].delFee
      : 0;

  const handleQuantity = (productNo, change) => {
    setCheckoutProducts((prevProducts) => {
      const updatedCart = prevProducts.map((item) => {
        if (Number(item.item.no) === Number(productNo)) {
          return {
            ...item,
            quantity: Math.max(1, Number(item.quantity) + change),
          };
        }
        return item;
      });
      if (!buyNow) {
        updateCart(updatedCart); //update the counter ony if temporary cart is rendered
      }
      return updatedCart;
    });
  };
  //delete item
  const deleteItemHandler = (productId) => {
    const updatedCart = checkoutProducts.filter(
      (selected) => Number(selected.item.no) !== Number(productId),
    );
    setCheckoutProducts(updatedCart);
    if (!buyNow) {
      updateCart(updatedCart);
    }
  };

  return (
    <>
      <section className="cart-second-sec">
        <div>
          <h3>Order Summary</h3>
          {checkoutProducts.length === 0 ? (
            <div className="order-summary-message">
              Your cart is empty. Please add items to your cart before
              proceeding to checkout.
            </div>
          ) : (
            ""
          )}

          <ul className="cart-checkout-content">
            {checkoutProducts.map((item) => (
              <li key={item.item.no}>
                <div className="check-product-details-con">
                  <div className="check-cart-product-image">
                    <img
                      src={item.item.image}
                      alt="product-item-${product.item.no}"
                    />
                  </div>
                  <div className="check-cart-product-details">
                    <strong>{item.product}</strong>
                    <span>{formatPrice(item.item.price)}</span>
                    <div className="check-cart-add-minus-con">
                      <div className="check-quantity-con">
                        <span>Quantity:</span>
                      </div>
                      <button
                        className="check-cart-minus-qty-btn"
                        onClick={() => handleQuantity(item.item.no, -1)}
                      >
                        −
                      </button>
                      <div className="check-cart-qty-display-con">
                        <span className="check-cart-qty-display">
                          {item.quantity}
                        </span>
                      </div>
                      <button
                        className="check-cart-add-qty-btn"
                        onClick={() => handleQuantity(item.item.no, 1)}
                      >
                        +
                      </button>
                      <button
                        className="cart-modal-del-btn"
                        onClick={() => deleteItemHandler(item.item.no)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {loading && <LoadingSpinner />}
          {error && <LoadingError />}
          {!loading && !error && (
            <ul className="totals-con">
              <li>
                <span>Subtotal:</span>
                <span className="sub-total">
                  {"$" +
                    (checkoutProducts.length !== 0
                      ? subTotal.toFixed(2)
                      : "0.00")}
                </span>
              </li>
              <li>
                <span>Delivery Fee:</span>
                <span className="delivery-fee">
                  {"$" +
                    (checkoutProducts.length !== 0 //render only when data is already fetched
                      ? dataSettings[0].delFee.toFixed(2)
                      : "0.00")}
                </span>
              </li>
              <li>
                <span>Tax Fee:</span>
                <span className="tax-fee">
                  {"%" +
                    (checkoutProducts.length !== 0 //render only when data is already fetched
                      ? Number(dataSettings[0].taxRate) * 100
                      : "0.00")}
                </span>
              </li>
              <li>
                <span>Total:</span>
                <span className="grand-total">
                  {"$" +
                    (checkoutProducts.length !== 0
                      ? grandTotal.toFixed(2)
                      : "0.00")}
                </span>
              </li>
            </ul>
          )}

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
