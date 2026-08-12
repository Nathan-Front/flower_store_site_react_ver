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
import { Link } from "react-router-dom";
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

  //Always reveal content on top
  const shopSectionRef = useRef(null);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    shopSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const fieldsetContents = [
    {
      title: "Categories",
      filterOpt: "categories",
      option: [
        { value: "all-bouquets", label: "All Bouquets" },
        { value: "rose", label: "Roses" },
        { value: "lily", label: "Lilies" },
        { value: "tulip", label: "Tulips" },
        { value: "daisy", label: "Daisy" },
        { value: "hydrangeas", label: "Hydrangeas" },
        { value: "mix", label: "Mixed Flowers" },
      ],
    },
    {
      title: "Occasions",
      filterOpt: "occasions",
      option: [
        { value: "all-section", label: "All Occasions" },
        { value: "Birthday", label: "Birthday" },
        { value: "Anniversary", label: "Anniversary" },
        { value: "Valentine's Day", label: "Valentine's Day" },
        { value: "Mother's Day", label: "Mother's Day" },
        { value: "Get Well Soon", label: "Get Well Soon" },
        { value: "Sympathy", label: "Sympathy" },
        { value: "Congratulations", label: "Congratulations" },
      ],
    },
  ];
  const colors = [
    { value: "all-color", className: "all-color" },
    { value: "red", className: "red" },
    { value: "white", className: "white" },
    { value: "pink", className: "pink" },
    { value: "black", className: "black" },
    { value: "purple", className: "purple" },
    { value: "yellow", className: "yellow" },
    { value: "orange", className: "orange" },
  ];
  const [isSetDisplay, setDisplay] = useState(null);

  const filterDisplay = (filterName) => {
    setDisplay((current) => (current === filterName ? null : filterName));
    //changeSign("−");
  };

  //Set initial state values
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(100);
  //For styling
  const left = (minPrice / 150) * 100;
  const right = (maxPrice / 150) * 100;

  //filter function
  const [selectedCategory, setSelectedCategory] = useState("all-bouquets");
  const [selectedOccasion, setSelectedOccasion] = useState("all-section");
  const [selectedColor, setSelectedColor] = useState("all-color");

  const filteredProducts = products.filter((item) => {
    const categoryMatch =
      selectedCategory === "all-bouquets" || item.category === selectedCategory; //category from data formatter

    const occasionMatch =
      selectedOccasion === "all-section" ||
      item.occasion.includes(selectedOccasion); //occasion from data formatter

    const colorMatch =
      selectedColor === "all-color" || item.color === selectedColor;

    const priceMatch = item.price >= minPrice && item.price <= maxPrice;

    return categoryMatch && occasionMatch && colorMatch && priceMatch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = cardsPerPage;
  const lastProductIndex = currentPage * productsPerPage; //last product in each page to understand until where display will be
  const firstProductIndex = lastProductIndex - productsPerPage; //Display products per page

  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex,
  ); //Create starting and ending per page
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); //calculate pages
  //console.log(currentProducts);
  const displayStart = firstProductIndex + 1;
  const displayEnd = Math.min(lastProductIndex, filteredProducts.length);
  return (
    <>
      <section className="shop-second-sec" ref={shopSectionRef}>
        <div className="left-con">
          <div className="left-top-con">
            <ul>
              <li className="left-category">
                {fieldsetContents.map((fieldCon, index) => (
                  <fieldset key={index}>
                    <h3
                      className="category-title"
                      onClick={() => filterDisplay(fieldCon.filterOpt)}
                    >
                      {fieldCon.title}
                      <span>
                        {isSetDisplay === fieldCon.filterOpt ? "−" : "+"}
                      </span>
                    </h3>
                    <div
                      className={
                        isSetDisplay === fieldCon.filterOpt
                          ? "category-list showCategory"
                          : "category-list"
                      }
                    >
                      {fieldCon.option.map((item, index) => (
                        <label key={index}>
                          <input
                            type="radio"
                            name={fieldCon.filterOpt}
                            value={item.value}
                            id={item.value}
                            checked={
                              fieldCon.filterOpt === "categories"
                                ? selectedCategory === item.value
                                : selectedOccasion === item.value
                            }
                            onChange={(e) => {
                              {
                                if (fieldCon.filterOpt === "categories") {
                                  setSelectedCategory(e.target.value);
                                } else if (fieldCon.filterOpt === "occasions") {
                                  setSelectedOccasion(e.target.value);
                                }
                              }
                              setCurrentPage(1);
                            }}
                          />
                          <span className="flower-category">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </li>
              <li className="left-category">
                <h3
                  className="category-title"
                  onClick={() => filterDisplay("price")}
                >
                  Price Range<span>{isSetDisplay === "price" ? "−" : "+"}</span>
                </h3>
                <div
                  className={
                    isSetDisplay === "price"
                      ? "category-list price-filter showCategory"
                      : "category-list price-filter"
                  }
                >
                  <div className="price-values">
                    <span>
                      $<span id="min-value">{minPrice}</span>
                    </span>
                    <span>
                      $<span id="max-value">{maxPrice}</span>
                    </span>
                  </div>
                  <div className="range-slider">
                    <div
                      className="slider-track"
                      style={{
                        background: `linear-gradient(
                          to right,
                          #ead9df ${left}%,
                          #a64b66 ${left}%,
                          #a64b66 ${right}%,
                          #ead9df ${right}%
                        )`,
                      }}
                    ></div>
                    <input
                      type="range"
                      id="min-price"
                      min="0"
                      max="149"
                      value={minPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= maxPrice) {
                          setMinPrice(value);
                        }
                      }}
                      aria-label="min-price"
                    />
                    <input
                      type="range"
                      id="max-price"
                      min="0"
                      max="150"
                      value={maxPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= minPrice) {
                          setMaxPrice(value);
                        }
                      }}
                      aria-label="max-price"
                    />
                  </div>
                </div>
              </li>

              <li className="left-category">
                <h3
                  className="category-title"
                  onClick={() => filterDisplay("colors")}
                >
                  Color<span>{isSetDisplay === "colors" ? "−" : "+"}</span>
                </h3>
                <div
                  className={
                    isSetDisplay === "colors"
                      ? "category-list color-category showCategory"
                      : "category-list color-category"
                  }
                >
                  {colors.map((item, index) => (
                    <label className="color-label" key={index}>
                      <input
                        type="radio"
                        name="color"
                        value={item.value}
                        id={item.className}
                        aria-label={item.className}
                        checked={selectedColor === item.value}
                        onChange={(e) => setSelectedColor(e.target.value)}
                      />
                      <span className={`checkmark ${item.className}`}></span>
                    </label>
                  ))}
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
            <Link to="/contact">Learn More →</Link>
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
                {filteredProducts.length === 0 ? (
                  <div className="no-products">
                    <p>No bouquets match your selected filters.</p>

                    <button type="button" className="no-bouquet-reset-btn">
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  currentProducts.map((item, index) => (
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
                  ))
                )}
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
