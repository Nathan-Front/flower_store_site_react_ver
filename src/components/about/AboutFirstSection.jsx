import "./aboutFirstSection.css";

export default function AboutFirstSection() {
  return (
    <>
      <section className="about-first-sec">
        <h2>
          About<span>Us</span>
        </h2>
        <div className="image-divider">
          <img
            src="./images/about/firstSection/shop-heart.svg"
            alt="heart-icon"
          />
        </div>
        <span className="about-sub-title">
          Spreading happines, one bouquet at a time
        </span>
        <p className="about-description">
          <span>
            At Flos & Florere, flowers are more than just a beautiful.
          </span>
          <span>
            They are a way to express love, celebrate moments, and bring joy to
            everyday life.
          </span>
        </p>
        <img
          src="./images/about/firstSection/banner.webp"
          alt="shop-banner-image"
          className="about-banner"
        />
      </section>
    </>
  );
}
