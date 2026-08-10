import "./indexFourthSection.css";
import useFetch from "../hooks/renderFetchData.js";
import { formatWhyUsCards } from "../hooks/dataFormatter";
import LoadingSpinner from "../loadingComponent/LoadingSpinner";
import LoadingError from "../loadingComponent/LoadingError";
import useSectionIntersection from "../hooks/intersection";
export default function IndexFourthSection() {
  const {
    data: whyUsCards,
    loading,
    error,
  } = useFetch("why-us-cards", "whyUsCards", formatWhyUsCards);
  const { sectionRef, showSection } = useSectionIntersection();
  return (
    <>
      <section className="index-fourth-sec">
        <div
          className={
            showSection
              ? "fourth-sec-con intersect-items intersect"
              : "fourth-sec-con intersect-items"
          }
          ref={sectionRef}
        >
          <div className="fourth-upper-con">
            <img
              src="./images/index/fourthSection/flowers-floral-design.svg"
              alt="divider-image"
            />
          </div>
          <span>Why choose us?</span>
          <h3>
            Your <span>Happiness</span>, Our Promise
          </h3>
          <div className="fourth-lower-con">
            <img
              src="./images/index/fourthSection/heart.svg"
              alt="heart-image"
            />
          </div>
          <p>We go the extra mile to make every moment beautiful.</p>
        </div>
        {loading && <LoadingSpinner />}
        {error && <LoadingError />}
        {!loading && !error && (
          <ul
            className={
              showSection
                ? "why-us-list intersect-items intersect"
                : "why-us-list intersect-items"
            }
            ref={sectionRef}
          >
            {whyUsCards.map((item) => (
              <li key={item.no}>
                <img
                  src={item.mainImage}
                  alt={item.mainImgAlt}
                  className="why-us-icon"
                  loading="lazy"
                />
                <span>{item.cardTitle}</span>
                <div className="heart-con">
                  <img
                    src="./images/index/fourthSection/heart.svg"
                    alt="heart-image"
                    loading="lazy"
                  />
                </div>
                <p>{item.cardText}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
