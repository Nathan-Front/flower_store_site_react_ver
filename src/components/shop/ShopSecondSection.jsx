import "./shopSecondSection.css";
import useFetch from "../hooks/renderFetchData.js";
import { formatProducts } from "../hooks/dataFormatter.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import { getProductBadge } from "../hooks/productBadge.js";
import { displayProductRating } from "../hooks/productRating.jsx";
import { formatPrice } from "../hooks/productPriceFormat.jsx";
import { getCardsPerPage } from "../hooks/viewportPage.js";
import { useState, useEffect, useRef } from "react";
export default function ShopSecondSection() {
  const {
    data: products, //rename the data and render its contents
    loading,
    error,
  } = useFetch("products", "products", formatProducts);

  //Get the cards per page per window width size
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());
  //Make the thepage listen to screen width changes
  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = cardsPerPage;
  const lastProductIndex = currentPage * productsPerPage; //last product in each page to understand until where display will be
  const firstProductIndex = lastProductIndex - productsPerPage; //Display products per page

  const currentProducts = products.slice(firstProductIndex, lastProductIndex); //Create starting and ending per page
  const totalPages = Math.ceil(products.length / productsPerPage); //calculate pages
  //console.log(currentProducts);
  const displayStart = firstProductIndex + 1;
  const displayEnd = Math.min(lastProductIndex, products.length);

  //Always reveal content on top
  const shopSectionRef = useRef(null);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    shopSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <>
      <section className="shop-second-sec" ref={shopSectionRef}>
        <div className="left-con">
          <div className="left-top-con">
            <ul>
              <li className="left-category">
                <fieldset>
                  <h3 className="category-title">
                    Categories<span>+</span>
                  </h3>
                  <div className="category-list">
                    <label>
                      <input
                        type="radio"
                        name="category"
                        value="all-bouquets"
                        id="all-bouquets"
                      />
                      <span className="flower-category">All Bouquets</span>
                    </label>
                    <label>
                      <input type="radio" name="category" value="rose" />
                      <span className="flower-category">Roses</span>
                    </label>
                    <label>
                      <input type="radio" name="category" value="lily" />
                      <span className="flower-category">Lilies</span>
                    </label>
                    <label>
                      <input type="radio" name="category" value="tulip" />
                      <span className="flower-category">Tulips</span>
                    </label>
                    <label>
                      <input type="radio" name="category" value="daisy" />
                      <span className="flower-category">Daisy</span>
                    </label>
                    <label>
                      <input type="radio" name="category" value="hydrangeas" />
                      <span className="flower-category">Hydrangeas</span>
                    </label>
                    <label>
                      <input type="radio" name="category" value="mix" />
                      <span className="flower-category">Mixed Flowers</span>
                    </label>
                  </div>
                </fieldset>
              </li>
              <li className="left-category radio-category">
                <fieldset>
                  <h3 className="category-title">
                    Occasions<span>+</span>
                  </h3>
                  <div className="category-list">
                    <label>
                      <input
                        type="radio"
                        name="occasions"
                        value="all-section"
                        id="all-section"
                      />
                      <span className="ocassion-category">All Occasions</span>
                    </label>
                    <label>
                      <input type="radio" name="occasions" value="Birthday" />
                      <span className="ocassion-category">Birthday</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="occasions"
                        value="Anniversary"
                      />
                      <span className="ocassion-category">Anniversary</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="occasions"
                        value="Valentine's Day"
                      />
                      <span className="ocassion-category">Valentine's Day</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="occasions"
                        value="Mother's Day"
                      />
                      <span className="ocassion-category">Mother's Day</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="occasions"
                        value="Get Well Soon"
                      />
                      <span className="ocassion-category">Get Well Soon</span>
                    </label>
                    <label>
                      <input type="radio" name="occasions" value="Sympathy" />
                      <span className="ocassion-category">Sympathy</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="occasions"
                        value="Congratulations"
                      />
                      <span className="ocassion-category">Congratulations</span>
                    </label>
                  </div>
                </fieldset>
              </li>
              <li className="left-category">
                <h3 className="category-title">
                  Price Range<span>+</span>
                </h3>
                <div className="category-list price-filter">
                  <div className="price-values">
                    <span>
                      $<span id="min-value">20</span>
                    </span>
                    <span>
                      $<span id="max-value">120</span>
                    </span>
                  </div>
                  <div className="range-slider">
                    <div className="slider-track"></div>
                    <input
                      type="range"
                      id="min-price"
                      min="0"
                      max="149"
                      defaultValue="10"
                      aria-label="min-price"
                    />
                    <input
                      type="range"
                      id="max-price"
                      min="0"
                      max="150"
                      defaultValue="100"
                      aria-label="max-price"
                    />
                  </div>
                </div>
              </li>

              <li className="left-category">
                <h3 className="category-title">
                  Color<span>+</span>
                </h3>
                <div className="category-list color-category">
                  <label className="color-label">
                    <input
                      type="radio"
                      name="color"
                      value="all-color"
                      id="all-color"
                      aria-label="all-color"
                    />
                    <span className="checkmark all-color"></span>
                  </label>
                  <label className="color-label">
                    <input
                      type="radio"
                      name="color"
                      value="red"
                      id="all-red"
                      aria-label="all-red"
                    />
                    <span className="checkmark red"></span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="white"
                      id="all-white"
                      aria-label="all-white"
                    />
                    <span className="checkmark white"></span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="pink"
                      id="all-pink"
                      aria-label="all-pink"
                    />
                    <span className="checkmark pink"></span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="black"
                      id="all-black"
                      aria-label="all-black"
                    />
                    <span className="checkmark black"></span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="purple"
                      id="all-purple"
                      aria-label="all-purple"
                    />
                    <span className="checkmark purple"></span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="yellow"
                      id="all-yellow"
                      aria-label="all-yellow"
                    />
                    <span className="checkmark yellow"></span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="orange"
                      id="all-orange"
                      aria-label="all-orange"
                    />
                    <span className="checkmark orange"></span>
                  </label>
                </div>
              </li>
              <li>
                <button type="button" className="reset-filter">
                  Reset filter
                </button>
              </li>
            </ul>
          </div>
          <div className="left-bottom-con">
            <img
              src="./images/index/secondSection/delivery-fast-svgrepo-com.svg"
              alt="delivery-banner"
            />
            <h3>Same-day Delivery</h3>
            <p>Order by 2 PM for same-day delivery in select areas.</p>
            <a href="/contact.html">Learn More →</a>
          </div>
        </div>
        <div className="right-con">
          <div className="right-top-con">
            <div className="mobile-filter">
              <button className="filter-btn">Filter</button>
            </div>
            <div className="right-top-con-header">
              <span>
                Showing{" "}
                <span className="start-flower-count-per-page">
                  {displayStart}
                </span>
                –
                <span className="end-flower-count-per-page">{displayEnd} </span>
                of <span className="total-fowers">{products.length}</span>{" "}
                results
              </span>
            </div>
          </div>
          <div className="bouquet-con">
            {loading && <LoadingSpinner />}
            {error && <LoadingError />}
            {!loading && !error && (
              <ul className="flower-grid">
                {currentProducts.map((item, index) => (
                  <li
                    key={item.no}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="hover-cards">
                      {item.condition && (
                        <small className={`flower-badge ${item.condition}`}>
                          {getProductBadge(item.condition)}
                        </small>
                      )}
                      <img
                        src={item.image}
                        alt={`${item.imgAlt}-image`}
                        className="bouquet-img"
                        loading="lazy"
                      />
                      <div className="flower-info">
                        <div className="product-name">
                          <h4>{item.product}</h4>
                          <img
                            src="./images/shop/secondSection/heart-round.svg"
                            alt="heart-icon"
                            className="flower-heart-icon"
                            loading="lazy"
                          />
                        </div>
                        <div className="product-description">
                          <p>{item.description}</p>
                        </div>
                        <div className="product-rating">
                          {displayProductRating(item)}
                        </div>
                        <div className="product-price">
                          <span className="flower-price">
                            {formatPrice(item.price)}
                          </span>
                          <button className="cart-btn">
                            <i className="fa-solid fa-cart-shopping cart-icon"></i>
                            <span>Add To Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={index}
                    type="button"
                    className={
                      currentPage === page ? "page-btn activePage" : "page-btn"
                    }
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
