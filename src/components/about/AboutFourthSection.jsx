import "./aboutFourthSection.css";
import useFetch from "../hooks/renderFetchData.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import useSectionIntersection from "../hooks/intersection.js";
import { Link } from "react-router-dom";

export default function AboutFourthSection() {
  const { sectionRef, showSection } = useSectionIntersection();
  const {
    data: whyUs,
    loading,
    error,
  } = useFetch("aboutUsWhyUsCards", "whyUsCards");
  return (
    <>
      <section
        className={
          showSection
            ? "about-fourth-sec intersect-items intersect"
            : "about-fourth-sec intersect-items"
        }
        ref={sectionRef}
      >
        <span>Why Choose Us</span>
        <h3>More Than Just Flowers</h3>
        <div className="fourth-divider-con"></div>
        {loading && <LoadingSpinner />}
        {error && <LoadingError />}
        {!loading && !error && (
          <ul className="about-why-us-list">
            {whyUs.map((item) => (
              <li key={item.No}>
                <img
                  src="./images/about/fourthSection/check-circle.svg"
                  alt="check-icon"
                />
                <p>{item.WhyText}</p>
              </li>
            ))}
          </ul>
        )}

        <Link to="/shop" className="about-to-shop-btn">
          Shop Now →
        </Link>
        <img
          src="./images/about/fourthSection/small-bouquet.webp"
          alt="cover-image"
          className="about-why-us-cover"
        />
      </section>
    </>
  );
}
