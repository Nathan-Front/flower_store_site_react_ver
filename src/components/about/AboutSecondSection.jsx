import "./aboutSecondSection.css";
import useSectionIntersection from "../hooks/intersection.js";
export default function AboutSecondSection() {
  const { sectionRef, showSection } = useSectionIntersection();
  return (
    <>
      <section
        className={
          showSection
            ? "about-second-sec intersect-items intersect"
            : "about-second-sec intersect-items"
        }
        ref={sectionRef}
      >
        <div className="hero-con">
          <img src="./images/about/secondSection/hero.webp" alt="hero-image" />
        </div>
        <div className="about-us-con">
          <span>Our Story</span>
          <h3>Flowers. Passion. Purpose.</h3>
          <p>
            Flos & Florere was founded with a simple belief - that every flower
            has the power to say what words cannot.
          </p>
          <p>
            What started as a small local flower shop has grown into a trusted
            online destination for fresh, handicrafted bouquets made with love
            and care.
          </p>
          <p>
            We work closely with local growers and artisans to bring you the
            freshed blooms and unique designs for every occasion.
          </p>
        </div>
      </section>
    </>
  );
}
