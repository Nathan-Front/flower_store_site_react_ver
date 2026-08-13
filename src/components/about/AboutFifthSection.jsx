import "./aboutFifthSection.css";
import useFetch from "../hooks/renderFetchData.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import useSectionIntersection from "../hooks/intersection.js";

export default function AboutFifthSection() {
  const { sectionRef, showSection } = useSectionIntersection();
  const {
    data: ourPromise,
    loading,
    error,
  } = useFetch("aboutUsBottomCards", "bottomCards");
  return (
    <>
      <section
        className={
          showSection
            ? "about-fifth-sec intersect-items intersect"
            : "about-fifth-sec intersect-items"
        }
        ref={sectionRef}
      >
        <span>Our Promise</span>
        <h3>We Treat Every Order Like It's Our Own</h3>
        {loading && <LoadingSpinner />}
        {error && <LoadingError />}
        {!loading && !error && (
          <ul className="about-card-bot-list">
            {ourPromise.map((item) => (
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
        <img
          src="./images/about/fifthSection/background.webp"
          alt="background-image"
          className="our-promise-cover"
        />
      </section>
    </>
  );
}
