import "./aboutThirdSection.css";
import useFetch from "../hooks/renderFetchData.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import useSectionIntersection from "../hooks/intersection.js";
export default function AboutThirdSection() {
  const { sectionRef, showSection } = useSectionIntersection();
  const {
    data: ourValues,
    loading,
    error,
  } = useFetch("aboutUsTopCards", "topCards");

  return (
    <>
      <section
        className={
          showSection
            ? "about-third-sec intersect-items intersect"
            : "about-third-sec intersect-items"
        }
        ref={sectionRef}
      >
        <span>Our values</span>
        <h3>The Heart Behind Every Bouquet</h3>
        <div className="divider-img-con">
          <img src="./images/about/thirdSection/tulip.svg" alt="tulip-icon" />
        </div>
        {loading && <LoadingSpinner />}
        {error && <LoadingError />}
        {!loading && !error && (
          <ul className="about-card-list">
            {ourValues.map((item) => (
              <li key={item.No}>
                <img src={item.CardImg} alt={item.CardImgAlt} />
                <div>
                  <span>{item.CardTitle}</span>
                  <p>{item.CardText}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
