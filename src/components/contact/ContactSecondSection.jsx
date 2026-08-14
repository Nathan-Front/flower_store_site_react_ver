import "./contactSecondSection.css";
import useFetch from "../hooks/renderFetchData.js";
import LoadingSpinner from "../loadingComponent/LoadingSpinner.jsx";
import LoadingError from "../loadingComponent/LoadingError.jsx";
import useSectionIntersection from "../hooks/intersection.js";
import { Fragment } from "react";
import { useState } from "react";

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

  //Accordion
  const [openAnswer, setOpenAnswer] = useState(null);
  const handleFAQToggle = (index) => {
    setOpenAnswer((current) => (current === index ? null : index));
  };

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
                            <div
                              className="accordion-question"
                              onClick={() => handleFAQToggle(index)}
                            >
                              <p>{content.QuestionText}</p>
                            </div>
                            <div
                              className={`accordion-answer ${openAnswer === index ? "FAQopen" : ""}`}
                            >
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
          </ul>
        )}
      </section>
    </>
  );
}
