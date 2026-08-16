import "./shopSecondSection.css";
import { displayProductRating } from "../hooks/productRating.jsx";
import { useContext, useState } from "react";
import { OverlayContext } from "../loadingComponent/OverlayContext.jsx";

function AddToCartModal({
  modalOpen,
  setModalOpen,
  clickedProduct,
  shopProducts,
  cartItems,
  updateCart,
}) {
  console.log("cartItems:", cartItems);
  console.log("clickedProduct:", clickedProduct);
  const { setIsOpen } = useContext(OverlayContext); //overlay and spinner
  //hover change image
  const [mainImage, setMainImage] = useState(clickedProduct.image);

  const [isQuantity, setIsQuantity] = useState(1);
  //increase/decrease quantity
  const addMinusClickHandler = (btn) => {
    if (btn === "add") {
      setIsQuantity((prev) => prev + 1);
    }
    if (btn == "minus") {
      setIsQuantity((prev) => Math.max(0, prev - 1));
    }
  };
  //Add temporary storage
  const addToTemporaryCart = () => {
    //Search selected product from list
    const selectedProduct = shopProducts.find(
      (item) => Number(item.no) === Number(clickedProduct.no),
    );

    //Find existing product in temporary cart
    const itemExisting = cartItems.find(
      (cartItem) => Number(cartItem.item.no) === Number(clickedProduct.no),
    );

    if (isQuantity === 0) {
      alert("Input quantity.");
      return;
    }
    if (itemExisting) {
      itemExisting.quantity += isQuantity;
      alert("Item already in the cart.\nAdded quantity");
    } else {
      const updatedCart = [
        ...cartItems,
        {
          item: selectedProduct,
          quantity: isQuantity,
        },
      ];
      alert("Item added to cart.");
      updateCart(updatedCart);
    }
    setModalOpen(false);
    setIsOpen(false);
    setIsQuantity(1);
  };

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
            <img src={mainImage} alt={clickedProduct.imageAlt} />
          </div>
          <ul className="aside-sub-img">
            {clickedProduct.modal.map((icon) => (
              <li className="modal-icons" key={icon.no}>
                <img
                  src={icon.icon}
                  alt={icon.iconAlt}
                  onMouseEnter={() => setMainImage(icon.icon)}
                  onMouseLeave={() => setMainImage(clickedProduct.image)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="aside-product-details">
          <span className="aside-product-title">{clickedProduct.product}</span>
          <div className="product-rating-modal">
            {displayProductRating(clickedProduct)}
          </div>
          <span className="aside-product-price">{clickedProduct.price}</span>
          <p className="aside-product-detail">{clickedProduct.description}</p>
          <div className="quantity-con">
            <span>Quantity:</span>
            <div className="add-minus-con">
              <button
                id="minus-qty-btn"
                onClick={() => addMinusClickHandler("minus")}
              >
                −
              </button>
              <div className="qty-display-con">
                <span className="qty-display">{isQuantity}</span>
              </div>
              <button
                id="add-qty-btn"
                onClick={() => addMinusClickHandler("add")}
              >
                +
              </button>
            </div>
          </div>
          <div className="add-buy-con">
            <button id="add-to-cart" onClick={() => addToTemporaryCart()}>
              Add To Cart
            </button>
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
