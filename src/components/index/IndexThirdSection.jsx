import "./indexThirdSection.css";
import { Link } from "react-router-dom";
import useFetch from "../hooks/renderFetchData.js";
import { formatFilterCards } from "../hooks/dataFormatter.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import useSectionIntersection from "../hooks/intersection.js";
import { useNavigate } from "react-router-dom";
export default function IndexThirdSection() {
  const {
    data: filterCards, //rename the data and render its contents
    loading,
    error,
  } = useFetch(
    "index-filter-cards", //Case in apps script
    "filterCards", //Declared name in apps script
    formatFilterCards, //data formatter can be removed
  );
  //console.log(filterCards); //for debugging only
  const { sectionRef, showSection } = useSectionIntersection();

  //filter function add this to the button then declare param to shop page
  const navigate = useNavigate();
  return (
    <>
      <section className="index-third-sec">
        <div
          className={
            showSection
              ? "third-sec-con intersect-items intersect"
              : "third-sec-con intersect-items"
          }
          ref={sectionRef}
        >
          <div className="third-upper-con">
            <img
              src="./images/index/thirdSection/flower-2-svgrepo-com.svg"
              alt="flower-bouquet"
            />
            <span>Shop By</span>
          </div>
          <div className="third-lower-con">
            <h3>Occasion</h3>
            <img
              src="./images/index/thirdSection/spring-bloom.webp"
              alt="spring"
            />
          </div>
          <p>Find the perfect bouquet for every special occasion.</p>
        </div>
        <div
          className={
            showSection
              ? "lower-third-sec-con intersect-items intersect"
              : "lower-third-sec-con intersect-items"
          }
          ref={sectionRef}
        >
          <Link to="/shop.html" className="view-all-btn">
            View All Bouquets →
          </Link>
          {loading && <LoadingSpinner />}
          {error && <LoadingError />}
          {!loading && !error && (
            <ul className="occasion-list">
              {filterCards.map((item) => (
                <li
                  key={item.no}
                  className="to-shop-filter-item"
                  onClick={() =>
                    navigate(
                      `/shop?occasion=${encodeURIComponent(item.filterValue)}`,
                    )
                  }
                >
                  <div className="image-wrapper">
                    <img
                      src={item.mainImage}
                      alt="bouquet ${item.no}"
                      className="bouquet-img"
                      loading="lazy"
                    />
                    <img
                      src={item.circleImage}
                      alt="image-icon-${item.no}"
                      className="round-images"
                      loading="lazy"
                    />
                  </div>
                  <span>{item.cardTitle}</span>
                  <p>{item.cardText}</p>
                  <small>Explore More</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
