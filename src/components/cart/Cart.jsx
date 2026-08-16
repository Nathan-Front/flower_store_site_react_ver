import "../../index.css";
import Nav from "../navigation/Nav.jsx";
import { useState } from "react";
import { formatPrice } from "../hooks/productPriceFormat.jsx";
export default function Cart({
  cartOpen,
  setCartOpen,
  setIsOpen,
  cartItems,
  updateCart,
}) {
  const closeCartHandler = () => {
    setCartOpen(false);
    setIsOpen(false);
  };

  //use state to store the temporary storage. makes every update to related components
  const [cartStorage, setCartStorage] = useState(cartItems);

  const increaseQtyHandler = (productId) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (Number(cartItem.item.no) === Number(productId)) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      }
      return cartItem;
    });
    localStorage.setItem("temporaryCart", JSON.stringify(updatedCart));
    updateCart(updatedCart);
    return updatedCart;
  };
  const decreaseQtyHandler = (productId) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (Number(cartItem.item.no) === Number(productId)) {
        return {
          ...cartItem,
          quantity: Math.max(1, cartItem.quantity - 1),
        };
      }
      return cartItem;
    });
    localStorage.setItem("temporaryCart", JSON.stringify(updatedCart));
    updateCart(updatedCart);
    return updatedCart;
  };

  const totalPayment = cartItems.reduce(
    (total, product) => total + product.item.price * product.quantity,
    0,
  );

  let totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);

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
          {cartItems.length === 0 ? (
            <p>
              Your cart is empty (<span>0 item</span>)
            </p>
          ) : (
            <>
              <p>
                Your cart content (
                <span className="cart-modal-counter">
                  {totalQty} item{totalQty > 1 ? "s" : ""}
                </span>
                )
              </p>
              <ul className="added-items-container">
                {cartItems.map((product) => (
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
                          <button
                            className="cart-minus-qty-btn"
                            onClick={() => decreaseQtyHandler(product.item.no)}
                          >
                            −
                          </button>
                          <div className="cart-qty-display-con">
                            <span className="cart-qty-display">
                              {product.quantity}
                            </span>
                          </div>
                          <button
                            className="cart-add-qty-btn"
                            onClick={() => increaseQtyHandler(product.item.no)}
                          >
                            +
                          </button>
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
              <span className="cart-modal-total-payment">
                {formatPrice(totalPayment)}
              </span>
            </p>
            <a href="./cart.html">Proceed to check out</a>
          </div>
        </div>
      </aside>
    </>
  );
}
