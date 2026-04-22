import "./contact.css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FORMSUBMIT_URL = "https://formsubmit.co/fineanswer2025@gmail.com";

export default function ContactSection() {
  const thankYouUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname || "/"}${window.location.hash || "#contact"}?submitted=1`
      : "";

  return (
    <section className="contact-wrapper" id="contact">
      <div className="contact-container">
        <div className="contact-panel">
          {/* LEFT: FORM */}
          <div className="contact-formPanel">
            <form className="contact-form" action={FORMSUBMIT_URL} method="POST">
            <input type="hidden" name="_subject" value="FineAnswer: Free Consultation Request" />
            <input type="hidden" name="_replyto" value="email" />
            <input type="hidden" name="_captcha" value="false" />
            {thankYouUrl && (
              <input type="hidden" name="_next" value={thankYouUrl} />
            )}

              <div className="contact-formGrid">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    placeholder="+880 1XXXXXXXXX"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-date">Appointment Date</label>
                  <input id="contact-date" type="date" name="appointmentDate" />
                </div>
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  placeholder="Write your questions or requirements"
                  required
                />
              </div>

              <button type="submit" className="send-btn">
                Send
              </button>
            </form>
          </div>

          {/* RIGHT: INFO */}
          <div className="contact-infoPanel">
            <p className="contact-tag">Contact Us</p>
            <h2 className="contact-title">Get In Touch</h2>
            <p className="contact-desc">
              Reach us anytime for guidance on universities, visas, applications, scholarships, and more. Our advisors
              respond within 24 hours.
            </p>

            <div className="contact-info">
              <div className="contact-infoItem">
                <span className="contact-infoIcon" aria-hidden="true">
                  <FaPhone />
                </span>
                <div className="contact-infoText">
                  <div className="contact-infoLabel">Call Us</div>
                  <div className="contact-infoValue">+880 1725-980472, +880 1725-971833</div>
                </div>
              </div>

              <div className="contact-infoItem">
                <span className="contact-infoIcon contact-infoIcon--whatsapp" aria-hidden="true">
                  <FaWhatsapp />
                </span>
                <div className="contact-infoText">
                  <div className="contact-infoLabel">Ireland & Abroad Hotline</div>
                  <a
                    href="https://wa.me/353899519986"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-infoLink"
                    aria-label="Ireland & Abroad Hotline on WhatsApp"
                  >
                    +353 (89) 951 9986
                  </a>
                </div>
              </div>

              <div className="contact-infoItem">
                <span className="contact-infoIcon" aria-hidden="true">
                  <FaEnvelope />
                </span>
                <div className="contact-infoText">
                  <div className="contact-infoLabel">Email Us</div>
                  <div className="contact-infoValue">studyabroad@fineanswer.net</div>
                </div>
              </div>

              <div className="contact-infoItem">
                <span className="contact-infoIcon" aria-hidden="true">
                  <FaMapMarkerAlt />
                </span>
                <div className="contact-infoText">
                  <div className="contact-infoLabel">Address</div>
                  <div className="contact-infoValue">House 76/A, Road 11, Banani, Dhaka 1213, Bangladesh</div>
                </div>
              </div>
            </div>

            <div className="social-icons" aria-label="Follow us on">
              <a href="https://www.facebook.com/FineanswerStudyAbroad" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/fineanswerstudyabroad/?originalSubdomain=bd"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/fineanswer_study_abroad/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@FineAnswerStudyAbroad/videos"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
