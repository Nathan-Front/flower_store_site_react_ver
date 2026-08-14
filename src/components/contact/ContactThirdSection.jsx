import "./contactThirdSection.css";
import useFetch from "../hooks/renderFetchData.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import useSectionIntersection from "../hooks/intersection.js";
import { Fragment } from "react";

export default function ContactThirdSection() {
  const { sectionRef, showSection } = useSectionIntersection();
  const {
    data: getInTouch,
    loading: getInTouchLoading,
    error: getInTouchError,
  } = useFetch("contactGetInTouch", "contactGetInTouch");
  const {
    data: socialMedia,
    loading: socialMediaLoading,
    error: socialMediarError,
  } = useFetch("contactMedia", "contactMedia");
  const loading = getInTouchLoading || socialMediaLoading;
  const error = getInTouchError || socialMediarError;

  return (
    <>
      <section
        className={
          showSection
            ? "contact-third-sec intersect-items intersect"
            : "contact-third-sec intersect-items"
        }
        ref={sectionRef}
      >
        <div className="contact-sub-con">
          <div className="third-details-con">
            <div className="upper-divider">
              <img
                src="./images/contact/thirdSection/rose.svg"
                alt="rose-icon"
              />
            </div>
            <div className="get-in-touch-title">Get in Touch</div>
            <div className="get-in-touch-title title-second">
              With Us
              <img
                src="./images/contact/thirdSection/sunflower.svg"
                alt="sunflower-icon"
              />
            </div>
            {loading && <LoadingSpinner />}
            {error && <LoadingError />}
            {!loading && !error && (
              <div className="get-in-touch-text">
                {getInTouch.map((item) => (
                  <Fragment key={item.No}>
                    <p>{item.Text}</p>
                  </Fragment>
                ))}
              </div>
            )}
            {!loading && !error && (
              <ul className="contact-channels">
                {socialMedia.map((item) => (
                  <li key={item.No}>
                    <a href={item.MediaLink}>
                      <img src={item.MediaImg} alt={item.MediaImgAlt} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="third-form-con">
            <img src="./images/contact/thirdSection/lily.svg" alt="lily-icon" />
            <span>Send Us a Message</span>
            <div className="form-divider">
              <img
                src="./images/index/fourthSection/heart.svg"
                alt="heart-icon"
              />
            </div>
            <form id="get-in-touch" className="contact-form">
              <input type="hidden" name="formType" value="message" />
              <div>
                <img
                  src="./images/contact/thirdSection/person.svg"
                  alt="person-icon"
                  className="background-icon"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <img
                  src="./images/contact/thirdSection/mail.svg"
                  alt="mail-icon"
                  className="background-icon"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email Address"
                  required
                />
              </div>
              <div>
                <img
                  src="./images/contact/thirdSection/phone.svg"
                  alt="phone-icon"
                  className="background-icon"
                />
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div>
                <img
                  src="./images/contact/thirdSection/text.svg"
                  alt="text-document-icon"
                  className="background-icon"
                />
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  required
                />
              </div>
              <div>
                <img
                  src="./images/contact/thirdSection/pencil.svg"
                  alt="pencil-icon"
                  className="textarea-background-icon"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  id="message"
                  required
                ></textarea>
              </div>
              <label htmlFor="website" className="visually-hidden">
                {" "}
                Website{" "}
              </label>
              <input
                type="text"
                name="website"
                id="website"
                className="honeypot"
              />
              <button type="submit" className="send-button">
                <span className="send-btn-text">Send</span>
              </button>
            </form>
            <div className="form-divider">
              <img
                src="./images/index/fourthSection/heart.svg"
                alt="heart-icon"
              />
            </div>
            <p>We appreciate your message and will get back to you soon.</p>
          </div>
        </div>

        <img
          src="./images/contact/thirdSection/contact-third-banner.png"
          alt="third-banner-image"
          className="contact-third-banner"
        />
      </section>
    </>
  );
}
