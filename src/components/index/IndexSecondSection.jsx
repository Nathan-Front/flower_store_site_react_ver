import "./indexSecondSection.css";
import { Link } from "react-router-dom";
import useFetch from "../hooks/renderFetchData.js";
import { formatBestSellers } from "../hooks/dataFormatter.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import useSectionIntersection from "../hooks/intersection.js";
import { useNavigate } from "react-router-dom";
export default function IndexSecondSection() {
  const {
    data: bestSellers, //rename the data and render its contents
    loading,
    error,
  } = useFetch(
    "best-seller-cards", //Case in apps script
    "bestSellers", //Declared name in apps script
    formatBestSellers, //data formatter can be removed
  );
  //console.log("best sellers", bestSeller); //for debugging only
  const { sectionRef, showSection } = useSectionIntersection();
  const navigate = useNavigate();
  return (
    <>
      <section className="index-second-sec">
        <div
          className={
            showSection
              ? "upper-con intersect-items intersect"
              : "upper-con intersect-items"
          }
          ref={sectionRef}
        >
          <ul>
            <li>
              <img
                src="./images/index/secondSection/flower-tulip-svgrepo-com.svg"
                alt="flower-logo"
              />
              <div>
                <span>Fresh Flowers</span>
                <p>Handpicked daily</p>
              </div>
            </li>
            <li>
              <img
                src="./images/index/secondSection/delivery-fast-svgrepo-com.svg"
                alt="truck-logo"
              />
              <div>
                <span>Free Delivery</span>
                <p>On orders over $50</p>
              </div>
            </li>
            <li>
              <img
                src="./images/index/secondSection/secure-payment-fill-svgrepo-com.svg"
                alt="secure-payment-logo"
              />
              <div>
                <span>Secure Payment</span>
                <p>100% secure checkout</p>
              </div>
            </li>
            <li>
              <img
                src="./images/index/secondSection/time-twenty-four-svgrepo-com.svg"
                alt="time-logo"
              />
              <div>
                <span>Support 24/7</span>
                <p>We're here to help</p>
              </div>
            </li>
          </ul>
        </div>
        <div
          className={
            showSection
              ? "lower-con intersect-items intersect"
              : "lower-con intersect-items"
          }
          ref={sectionRef}
        >
          <h3>Featured Bouquets</h3>
          <Link to="/shop.html" className="view-all-btn">
            View All Bouquets →
          </Link>
          {loading && <LoadingSpinner />}
          {error && <LoadingError />}
          {!loading && !error && (
            <ul className="best-seller-cards">
              {bestSellers.map((item) => (
                <li key={item.no}>
                  <img
                    src={item.image}
                    alt="bouquet-${item.no}"
                    loading="lazy"
                  />
                  <div>
                    <small>Best Seller</small>
                    <span>{item.product}</span>
                    <p>{item.description}</p>
                    <div className="price-btn-con">
                      <span className="price">${item.price}</span>
                      <button
                        aria-label="Add to cart"
                        className="add-to-cart-best-seller"
                        data-product-id={item.no}
                        onClick={() => {
                          navigate(
                            `/shop?product=${encodeURIComponent(item.no)}`,
                          );
                        }}
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        Add to Cart →
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
