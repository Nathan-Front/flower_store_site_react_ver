import "../../index.css";
import { useState } from "react";
import { formatPrice } from "../hooks/productPriceFormat";
export default function Cart({ cartOpen, setCartOpen, setIsOpen }) {
  const tempCart = JSON.parse(localStorage.getItem("temporaryCart")) || [];
  let totalQty = tempCart.reduce((total, item) => total + item.quantity, 0);
  const closeCartHandler = () => {
    setCartOpen(false);
    setIsOpen(false);
  };
  const totalPayment = tempCart.reduce(
    (total, product) => total + product.item.price * product.quantity,
    0,
  );
  const [totalQuantity, setTotalQuantity] = useState(totalQty);

  return (
    <>
      <aside className={`cart-modal-aside ${cartOpen ? "cartModal" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button
            id="close-cart"
            aria-label="Close cart"
            onClick={() => closeCartHandler()}
          >
            X
          </button>
        </div>
        <div className="cart-modal-content">
          {tempCart.length === 0 ? (
            <p>
              Your cart is empty (<span>0 item</span>)
            </p>
          ) : (
            <>
              <p>
                Your cart content (
                <span className="cart-modal-counter">
                  {totalQuantity} item{totalQuantity > 1 ? "s" : ""}
                </span>
                )
              </p>
              <ul className="added-items-container">
                {tempCart.map((product) => (
                  <li data-product-id={product.item.no} key={product.item.no}>
                    <div className="product-details-con">
                      <div className="cart-product-image">
                        <img
                          src={product.item.image}
                          alt="product-item-${product.item.no}"
                        />
                      </div>
                      <div className="cart-product-details">
                        <strong>{product.item.product}</strong>
                        <span>{formatPrice(product.item.price)}</span>
                        <div className="cart-add-minus-con">
                          <div className="quantity-con">
                            <span>Quantity:</span>
                          </div>
                          <button className="cart-minus-qty-btn">−</button>
                          <div className="cart-qty-display-con">
                            <span className="cart-qty-display">
                              {product.quantity}
                            </span>
                          </div>
                          <button className="cart-add-qty-btn">+</button>
                          <button className="cart-modal-del-btn">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="to-check-out">
            <p>
              Total:{" "}
              <span className="cart-modal-total-payment">{totalPayment}</span>
            </p>
            <a href="./cart.html">Proceed to check out</a>
          </div>
        </div>
      </aside>
    </>
  );
}
