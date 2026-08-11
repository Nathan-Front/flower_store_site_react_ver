import { Link } from "react-router-dom";
import { validateEmail } from "../../script/emailValidator.js";
import { useContext, useState } from "react";
import { OverlayContext } from "../loadingComponent/OverlayContext.jsx";
export default function Footer() {
  const initialForm = { email: "", _honey: "" };
  const [isInput, setIsInput] = useState(initialForm);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setIsInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const { setIsOpen, setSpinner } = useContext(OverlayContext); //overlay and spinner

  const subscriberHandler = async (e) => {
    e.preventDefault();
    if (isInput._honey) {
      console.log("Bot detected");
      return;
    }
    const result = validateEmail(isInput.email);
    if (!result) {
      //setIsError(true);
      return;
    }

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyKLPGoQElgHbTen7D6Xsqlwodlfaj3ikkim-QEeal7xp1a6iQR3ScmZQURg3ziFGLJ/exec";
    const param = {
      formType: "subscribe",
      email: isInput.email,
    };
    setIsOpen(true);
    setSpinner("loading");
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(param),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        alert(
          "Thank you for subscribing. 🌸\n" +
            "Watch out for some news or related information in the future.",
        );
        setIsInput(initialForm);
      } else {
        alert("Email already subscribed.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      setSpinner(null);
    }
  };

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
            <form
              className="newsletter-form"
              id="subscribe-form"
              onSubmit={subscriberHandler}
            >
              <input
                type="email"
                name="email"
                id="subscribe"
                autoComplete="email"
                placeholder="Your email address"
                required
                aria-label="Email address"
                onChange={inputHandler}
                value={isInput.email}
              />
              <input
                type="text"
                name="website"
                className="footer-honeypot"
                onChange={inputHandler}
                value={isInput._honey}
              />
              <button type="submit" id="subscribe-btn">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Flos & Florere Co. All rights reserved.</p>
          <p>
            Created by Jonathan-
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
