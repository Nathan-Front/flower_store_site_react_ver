import "./contactSecondSection.css";
import useFetch from "../hooks/renderFetchData.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import useSectionIntersection from "../hooks/intersection.js";
import { Fragment } from "react";

export default function ContactSecondSection() {
  const { sectionRef, showSection } = useSectionIntersection();
  const {
    data: contactUpper,
    loading: contactUpperLoading,
    error: contactUpperError,
  } = useFetch("contactCards", "contactCards");

  const {
    data: cardContent,
    loading: cardContentLoading,
    error: cardContentError,
  } = useFetch("contactContents", "contactContents");

  const loading = contactUpperLoading || cardContentLoading;
  const error = contactUpperError || cardContentError;

  return (
    <>
      <section
        className={
          showSection
            ? "contact-second-sec intersect-items intersect"
            : "contact-second-sec intersect-items"
        }
        ref={sectionRef}
      >
        <h3>
          <span>Send Us a Message</span>
          <span>for more details below</span>
        </h3>
        {loading && <LoadingSpinner />}
        {error && <LoadingError />}
        {!loading && !error && (
          <ul className="contact-card-list-con">
            {contactUpper.map((upperContent) => (
              <li key={upperContent.CardID}>
                <div className="card-logo-title">
                  <img
                    src={upperContent.Icon}
                    alt={upperContent.IconAlt}
                    className="circle-icons"
                  />
                  <h3>{upperContent.Title}</h3>
                </div>

                <div className="card-divider">
                  <img
                    src="./images/about/firstSection/shop-heart.svg"
                    alt="heart-icon"
                  />
                </div>
                <p>{upperContent.Description}</p>
                {cardContent
                  .filter((content) => content.CardID === upperContent.CardID)
                  .map((content, index) => (
                    <Fragment key={index}>
                      {content.ContentType === "contact" && (
                        <div className="contact-support-card">
                          <div>
                            <img
                              src={content.ItemIcon}
                              alt={content.ItemIconAlt}
                            />
                            <div>
                              <span>{content.QuestionText}</span>
                              <p>{content.AnswerSubtext}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {content.ContentType === "list" && (
                        <div>
                          <div>
                            <img
                              src={content.ItemIcon}
                              alt={content.ItemIconAlt}
                            />
                            <p>{content.QuestionText}</p>
                          </div>
                        </div>
                      )}
                      {content.ContentType === "faq" && (
                        <div className="accordion-card">
                          <div className="accordion-list">
                            <div className="accordion-question">
                              <p>{content.QuestionText}</p>
                            </div>
                            <div className="accordion-answer">
                              <p>{content.AnswerSubtext}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <img
                        src={upperContent.BackgroundImage}
                        alt="card-background"
                        className="card-background"
                      />
                    </Fragment>
                  ))}
              </li>
            ))}
            {/* <li data-contactCard="card 1">
              <div className="card-logo-title">
                <img
                  src="./images/contact/secondSection/contact-support.png"
                  alt="contact-icon"
                  className="circle-icons"
                />
                <h3>Contact Support</h3>
              </div>

              <div className="card-divider">
                <img
                  src="./images/about/firstSection/shop-heart.svg"
                  alt="heart-icon"
                />
              </div>
              <p>
                Our friendly team is here to help with any questions or concers
                you may have.
              </p>
              <div className="contact-support-card">
                <div>
                  <img
                    src="./images/contact/secondSection/phone.svg"
                    alt="phone-icon"
                  />
                  <div>
                    <span>+1(000)123-4567</span>
                    <p>Mon - Sat 8:00 AM - 7:00 PM</p>
                  </div>
                </div>
                <div>
                  <img
                    src="./images/contact/mail-svgrepo.svg"
                    alt="mail-icon"
                  />
                  <div>
                    <span>hello@flosflorere.com</span>
                    <p>We reply withing 24 hours</p>
                  </div>
                </div>
              </div>
              <img
                src="./images/contact/secondSection/card1.png"
                alt="card-background"
                className="card-background"
              />
            </li>
            <li data-contactCard="card 2">
              <div className="card-logo-title">
                <img
                  src="./images/contact/secondSection/delivery-info.png"
                  alt="truck-icon"
                  className="circle-icons"
                />
                <h3>Deliver Information</h3>
              </div>

              <div className="card-divider">
                <img
                  src="./images/about/firstSection/shop-heart.svg"
                  alt="heart-icon"
                  className="circle-icons"
                />
              </div>
              <p>
                Learn about our deivery options, areas, times, and everything
                you need to know about your order.
              </p>
              <div className="delivery-information-card">
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Same-day delivery available</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Delivery areas & fees</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Order tracking</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Delivery time slots</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Special instructions</p>
                </div>
              </div>
              <img
                src="./images//contact/secondSection/card2.png"
                alt="card-background"
                className="card-background"
              />
            </li>
            <li data-contactCard="card 3">
              <div className="card-logo-title">
                <img
                  src="./images/contact/secondSection/flower-care.png"
                  alt="flower-icon"
                  className="circle-icons"
                />
                <h3>Floral Care Guide</h3>
              </div>
              <div className="card-divider">
                <img
                  src="./images/about/firstSection/shop-heart.svg"
                  alt="heart-icon"
                />
              </div>
              <p>
                Tips and advice to help your flowers stay fresh and beautiful
                for as long as possible.
              </p>
              <div className="flower-care-card">
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-pink.svg"
                    alt="circle-check-icon"
                  />
                  <p>How to care for your flowers</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-pink.svg"
                    alt="circle-check-icon"
                  />
                  <p>Best practice for longevity</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-pink.svg"
                    alt="circle-check-icon"
                  />
                  <p>Watering & trimming tips</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-pink.svg"
                    alt="circle-check-icon"
                  />
                  <p>Flower care by type</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-pink.svg"
                    alt="circle-check-icon"
                  />
                  <p>Troubleshooting common issues</p>
                </div>
              </div>
              <img
                src="./images/contact/secondSection/card3.png"
                alt="card-background"
                className="card-background"
              />
            </li>
            <li data-contactCard="card 4">
              <div className="card-logo-title">
                <img
                  src="./images/contact/secondSection/faq.png"
                  alt="faq-icon"
                  className="circle-icons"
                />
                <h3>FAQs</h3>
              </div>
              <div className="card-divider">
                <img
                  src="./images/about/firstSection/shop-heart.svg"
                  alt="heart-icon"
                />
              </div>
              <p>
                Find answers to the most common questions about orders,
                payments, delivery, products, and more.
              </p>
              <div className="accordion-card">
                <div className="accordion-list">
                  <div className="accordion-question">
                    <p>How do I place an order?</p>
                  </div>
                  <div className="accordion-answer">
                    <p>
                      Browse our collection, choose your favorite bouquet or
                      arrangement, add it to your cart, and proceed to checkout.
                      Enter your delivery details, select your preferred payment
                      method, and confirm your order. You'll receive a
                      confirmation email once your purchase is complete.
                    </p>
                  </div>
                </div>
                <div className="accordion-list">
                  <div className="accordion-question">
                    <p>What payment methods do you accept?</p>
                  </div>
                  <div className="accordion-answer">
                    <p>
                      We accept major credit and debit cards, PayPal, Apple Pay,
                      and Google Pay. Available payment methods may vary
                      depending on your location.
                    </p>
                  </div>
                </div>
                <div className="accordion-list">
                  <div className="accordion-question">
                    <p>Can I change or cancel my order?</p>
                  </div>
                  <div className="accordion-answer">
                    <p>
                      Yes, you can modify or cancel your order if it hasn't been
                      prepared or dispatched. Please contact our customer
                      support as soon as possible, and we'll do our best to
                      accommodate your request.
                    </p>
                  </div>
                </div>
                <div className="accordion-list">
                  <div className="accordion-question">
                    <p>Do you offer same-day delivery?</p>
                  </div>
                  <div className="accordion-answer">
                    <p>
                      Yes! We offer same-day delivery for orders placed before
                      our daily cut-off time. Same-day delivery is available in
                      selected areas and is subject to product availability.
                    </p>
                  </div>
                </div>
                <div className="accordion-list">
                  <div className="accordion-question">
                    <p>How can I track my order?</p>
                  </div>
                  <div className="accordion-answer">
                    <p>
                      Once your order has been dispatched, you'll receive a
                      confirmation email with a tracking link. You can use it to
                      monitor your delivery status in real time until it
                      arrives.
                    </p>
                  </div>
                </div>
              </div>
              <img
                src="./images/contact/secondSection/card4.png"
                alt="card-background"
                className="card-background"
              />
            </li>
            <li data-contactCard="card 5">
              <div className="card-logo-title">
                <img
                  src="./images/contact/secondSection/return-refund.png"
                  alt="refund-icon"
                  className="circle-icons"
                />
                <h3>Return & Refunds</h3>
              </div>
              <div className="card-divider">
                <img
                  src="./images/about/firstSection/shop-heart.svg"
                  alt="heart-icon"
                />
              </div>
              <p>
                We want you to be completely happy with our order. Learn about
                our return and refund policy.
              </p>
              <div className="return-refunds-card">
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Elegibility for returns</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Damaged or incorrect items</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Refund process & timelines</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>How to request a return</p>
                </div>
                <div>
                  <img
                    src="./images/contact/secondSection/circle-check-green.svg"
                    alt="circle-check-icon"
                  />
                  <p>Non-refundable items</p>
                </div>
              </div>
              <img
                src="./images/contact/secondSection/card5.png"
                alt="card-background"
                className="card-background"
              />
            </li> */}
          </ul>
        )}
      </section>
    </>
  );
}
