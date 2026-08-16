import "../../index.css";
import { formatPrice } from "../hooks/productPriceFormat.jsx";
import { CartCount } from "../hooks/cartCount.js";
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
  //increase quantity
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
    updateCart(updatedCart);
    return updatedCart;
  };
  //decrease quantity
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
    updateCart(updatedCart);
    return updatedCart;
  };
  //delete item
  const deleteItemHandler = (productId) => {
    const updatedStorage = cartItems.filter(
      (selected) => Number(selected.item.no) !== Number(productId),
    );
    updateCart(updatedStorage);
  };

  const totalPayment = cartItems.reduce(
    (total, product) => total + product.item.price * product.quantity,
    0,
  );
  let cartCnt = CartCount(cartItems); //pass to calculate total

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
                  {cartCnt} item{cartCnt > 1 ? "s" : ""}
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
                          <button
                            className="cart-modal-del-btn"
                            onClick={() => deleteItemHandler(product.item.no)}
                          >
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
