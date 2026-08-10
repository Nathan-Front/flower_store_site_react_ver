import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <h2 className="footer-logo">Flos & Florere</h2>
            <p className="footer-text">
              Bringing nature's finest poetry straight to your doorstep. Fresh,
              sustainably sourced, and hand-crafted daily.
            </p>
          </div>

          <div className="footer-col">
            <h3>Social Media</h3>
            <ul>
              <li>
                <a href="#" aria-label="Facebook">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" aria-label="Pinterest">
                  Pinterest
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Customer Care</h3>
            <ul>
              <li>
                <Link to="#" aria-label="Contact Support">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="#" aria-label="Delivery Information">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link to="#" aria-label="Flower Care Guide">
                  Flower Care Guide
                </Link>
              </li>
              <li>
                <Link to="#" aria-label="FAQs">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" aria-label="Returns & Refunds">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col newsletter-col">
            <h3>Stay in Bloom</h3>
            <p className="footer-text">
              Subscribe to receive floral inspiration, care tips, and 10% off
              your first order.
            </p>
            <form className="newsletter-form" id="subscribe-form">
              <input type="hidden" name="formType" value="subscribe" />
              <input
                type="email"
                name="email"
                id="subscribe"
                autoComplete="email"
                placeholder="Your email address"
                required
                aria-label="Email address"
              />
              <input type="text" name="website" className="footer-honeypot" />
              <button type="submit" id="subscribe-btn">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Flos & Florere Co. All rights reserved.</p>
          <p>
            Created by Jonathan
            <a
              href="https://nathan-front.github.io/Captain_of_the_Code_react_ver/"
              aria-label="Visit Jonathan's Portfolio"
            >
              Visit Jonathan's Portfolio
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
