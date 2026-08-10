import "./indexFirstSection.css";
import { Link } from "react-router-dom";
export default function IndexFirstSection() {
  return (
    <>
      <section className="index-first-sec">
        <h2 className="sec-title">
          <span>Fresh Flowers</span>
          <span>For Every Moment</span>
        </h2>
        <p>Handcrafted bouquets made with love and delivered with care.</p>
        <Link to="/shop.html" className="shop-now-btn">
          See All Bouquets
        </Link>
        <img
          src="./images/index/firstSection/banner.webp"
          alt="banner-image"
          className="desktop-banner"
        />
        <img
          src="./images/index/firstSection/mobile-banner.webp"
          alt="banner-image"
          className="mobile-banner"
        />
      </section>
    </>
  );
}
