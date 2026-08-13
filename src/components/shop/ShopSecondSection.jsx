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
import { Link, useSearchParams } from "react-router-dom";
export default function ShopSecondSection() {
  const {
    data: products, //rename the data and render its contents
    loading,
    error,
  } = useFetch("products", "products", formatProducts);

  const fieldsetContents = [
    {
      title: "Bouquets",
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

  //filter function from home page
  const [searchParams, setSearchParams] = useSearchParams();
  const occasionFromURL = searchParams.get("occasion");

  const [selectedOccasion, setSelectedOccasion] = useState(
    occasionFromURL || "all-section", //also use for shop page
  );
  //for displaying filter options
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isOccasionOpen, setIsOccasionOpen] = useState(
    Boolean(occasionFromURL),
  );
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  //Set initial state values
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(100);
  //For styling
  const left = (minPrice / 150) * 100;
  const right = (maxPrice / 150) * 100;

  //filter function for shop page use the filter occasion above
  const [selectedCategory, setSelectedCategory] = useState("all-bouquets");
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

  //Get the cards per page per window width size
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());
  //Make the the page listen to screen width changes
  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Always reveal content from top
  const shopSectionRef = useRef(null);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    shopSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = cardsPerPage;
  const lastProductIndex = currentPage * productsPerPage; //last product in each page to understand until where display will be
  const firstProductIndex = lastProductIndex - productsPerPage; //Display products per page
  const currentProducts = filteredProducts.slice(
    //use the filteredProducts instead of doing it directly from array
    firstProductIndex,
    lastProductIndex,
  );
  //Create starting and ending per page
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); //calculate pages
  const displayStart = firstProductIndex + 1;
  const displayEnd = Math.min(lastProductIndex, filteredProducts.length);

  //reset filters
  const resetFilterHandler = () => {
    setSelectedCategory("all-bouquets");
    setSelectedOccasion("all-section");
    setSelectedColor("all-color");
    setIsCategoryOpen(false);
    setIsOccasionOpen(false);
    setSearchParams({});
    setMinPrice(10);
    setMaxPrice(100);
    setIsPriceOpen(false);
    setIsColorOpen(false);
  };

  //Capitalize first letter of displayed filters
  const capitalizeFirst = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  //displaying filters on mobileviewport
  const [mobileFilter, setMobileFilter] = useState(false);
  const filterContainerRef = useRef(null);
  const filterButtonRef = useRef(null); //use specific ref for button since it is outside the filterContainerRef to be displayed
  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (!mobileFilter) return;
      const clickedInsideFilter = filterContainerRef.current?.contains(
        event.target,
      );
      const clickedFilterButton = filterButtonRef.current?.contains(
        event.target,
      );
      if (!clickedInsideFilter && !clickedFilterButton) {
        setMobileFilter(false);
      }
    };
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [mobileFilter]);
  return (
    <>
      <section className="shop-second-sec" ref={shopSectionRef}>
        <div
          className={mobileFilter ? "left-con show-filters " : "left-con"}
          ref={filterContainerRef}
        >
          <div className="left-top-con">
            <ul>
              <li className="left-category">
                {fieldsetContents.map((fieldCon, index) => (
                  <fieldset key={index}>
                    <h3
                      className="category-title"
                      onClick={() => {
                        fieldCon.filterOpt === "categories"
                          ? setIsCategoryOpen((prev) => !prev)
                          : setIsOccasionOpen((prev) => !prev);
                      }}
                    >
                      {fieldCon.title}
                      <span>
                        {(
                          fieldCon.filterOpt === "categories"
                            ? isCategoryOpen
                            : isOccasionOpen
                        )
                          ? "−"
                          : "+"}
                      </span>
                    </h3>
                    <div
                      className={
                        (
                          fieldCon.filterOpt === "categories"
                            ? isCategoryOpen
                            : isOccasionOpen
                        )
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
                              setCurrentPage(1); //reset the page to 1 when filtering
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
                  onClick={() => setIsPriceOpen((prev) => !prev)}
                >
                  Price Range<span>{isPriceOpen ? "−" : "+"}</span>
                </h3>
                <div
                  className={
                    isPriceOpen
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
                          setCurrentPage(1);
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
                          setCurrentPage(1);
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
                  onClick={() => setIsColorOpen((prev) => !prev)}
                >
                  Color<span>{isColorOpen ? "−" : "+"}</span>
                </h3>
                <div
                  className={
                    isColorOpen
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
                        onChange={(e) => {
                          setSelectedColor(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                      <span className={`checkmark ${item.className}`}></span>
                    </label>
                  ))}
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="reset-filter"
                  onClick={resetFilterHandler}
                >
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
              <button
                className="filter-btn"
                onClick={() => setMobileFilter((prev) => !prev)}
                ref={filterButtonRef}
              >
                Filter
              </button>
            </div>
            <div className="right-top-con-header">
              <span>
                Showing{" "}
                <span className="start-flower-count-per-page">
                  {displayStart}
                </span>
                –
                <span className="end-flower-count-per-page">{displayEnd} </span>
                of{" "}
                <span className="total-fowers">
                  {filteredProducts.length}
                </span>{" "}
                results
              </span>
            </div>
            <div className="active-filters">
              {
                <span className="active-filter">
                  Bouquets: {capitalizeFirst(selectedCategory)}
                </span>
              }
              {
                <span className="active-filter">
                  Occasion: {capitalizeFirst(selectedOccasion)}
                </span>
              }
              {
                <span className="active-filter">
                  Price: ${minPrice} - ${maxPrice}
                </span>
              }
              {
                <span className="active-filter">
                  Color: {capitalizeFirst(selectedColor)}
                </span>
              }
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
                    <button
                      type="button"
                      className="no-bouquet-reset-btn"
                      onClick={resetFilterHandler}
                    >
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
