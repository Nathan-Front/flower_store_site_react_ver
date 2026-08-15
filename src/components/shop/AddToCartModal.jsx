import "./shopSecondSection.css";
import { displayProductRating } from "../hooks/productRating.jsx";
import { useContext } from "react";
import { OverlayContext } from "../loadingComponent/OverlayContext.jsx";
function AddToCartModal({ modalOpen, setModalOpen, product }) {
  const { setIsOpen } = useContext(OverlayContext); //overlay and spinner
  return (
    <>
      <aside className={`aside-con ${modalOpen ? "showModal" : ""}`}>
        <button
          type="button"
          className="close-modal-btn"
          onClick={() => {
            setModalOpen(false);
            setIsOpen(false);
          }}
        >
          Close
        </button>
        <div className="aside-product-image">
          <div className="aside-main-img">
            <img src={product.image} alt={product.imageAlt} />
          </div>
          <ul className="aside-sub-img">
            {product.modal.map((icon) => (
              <li className="modal-icons" key={icon.no}>
                <img src={icon.icon} alt={icon.iconAlt} />
              </li>
            ))}
          </ul>
        </div>
        <div className="aside-product-details">
          <span className="aside-product-title">{product.product}</span>
          <div className="product-rating-modal">
            {displayProductRating(product)}
          </div>
          <span className="aside-product-price">{product.price}</span>
          <p className="aside-product-detail">{product.description}</p>
          <div className="quantity-con">
            <span>Quantity:</span>
            <div className="add-minus-con">
              <button id="minus-qty-btn">−</button>
              <div className="qty-display-con">
                <span className="qty-display">0</span>
              </div>
              <button id="add-qty-btn">+</button>
            </div>
          </div>
          <div className="add-buy-con">
            <button id="add-to-cart">Add To Cart</button>
            <button id="buy-now">Buy Now</button>
          </div>
          <ul className="modal-footer">
            <li>
              <img
                src="./images/index/secondSection/flower-tulip-svgrepo-com.svg"
                alt="flower-icon"
              />
              <div>
                <span>Fresh</span>
                <span>Flower</span>
              </div>
            </li>
            <li>
              <img
                src="./images/index/secondSection/delivery-fast-svgrepo-com.svg"
                alt="delivery-icon"
              />
              <div>
                <span>Free</span>
                <span>Delivery</span>
              </div>
            </li>
            <li>
              <img
                src="./images/index/secondSection/secure-payment-fill-svgrepo-com.svg"
                alt="secure-icon"
              />
              <div>
                <span>Secure</span>
                <span>Payment</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default AddToCartModal;
