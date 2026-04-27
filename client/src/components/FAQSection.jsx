import React, { useMemo, useState } from "react";
import faqsIllustration from "../assets/FAQs-bro.svg";

const FAQS = [
  {
    q: "Total Cost of Study in Ireland",
    a: `The total cost includes tuition fees and living expenses:
• Undergraduate: €9,000 – €15,000 per year
• Postgraduate: €10,000 – €35,000 per year
• Living Expenses: Approx. €10,000 – €12,000 per year (including accommodation, food, transport)
Example: For a one-year Master's at Dublin Business School costing €14,500, with €10,000 living expenses, your total estimated cost will be around €24,500.`,
  },
  {
    q: "How to Apply Online?",
    a: `You can apply through FineAnswer Ireland:
1. Visit our application portal or register on our website
2. Fill out the online application form
3. Upload necessary documents (passport, transcripts, CV, etc.)
4. A FineAnswer advisor will contact you within 24 hours to guide you further`,
  },
  {
    q: "Where to Contact for Further Information?",
    a: `For guidance and free counselling, you can contact us at:
• WhatsApp: +353 899 893 525
• Email: info@fineanswer.ie
• Visit our contact section below to submit an enquiry`,
  },
  {
    q: "What About English Test Requirements?",
    a: `FineAnswer Ireland can help you with IELTS preparation or Duolingo registration. All English tests approved by Irish Immigration are listed on the official immigration website. We also offer discounted test booking assistance. Visit our English Proficiency page for more details.`,
  },
  {
    q: "Can I Work While Studying in Ireland?",
    a: `Yes! International students with a Stamp 2 immigration permission can work:
• Up to 20 hours per week during term time
• Up to 40 hours per week during holiday periods (June–September, 15 Dec–15 Jan)
Ireland's minimum wage is €12.70/hour, making it one of the best destinations for part-time work while studying.`,
  },
  {
    q: "What Are the Visa Requirements for Ireland?",
    a: `To obtain an Irish student visa, you generally need:
• A valid passport
• A letter of acceptance from a recognized Irish institution
• Evidence of tuition fees paid
• Proof of financial capacity (€10,000 per year)
• Private medical insurance
• IELTS/Duolingo score (minimum requirements vary by institution)
FineAnswer Ireland provides end-to-end visa processing support.`,
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  const faqs = useMemo(() => FAQS, []);

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-header">
          <span className="section-badge">Help</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Trusted support for your Ireland journey.</p>
        </div>

        <div className="faq-layout">
          <div className="faq-left">
            <div className="faq-list">
              {faqs.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={item.q} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggle(i)}
                      type="button"
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-toggle" aria-hidden="true">
                        {isOpen ? "▾" : "▸"}
                      </span>
                    </button>
                    <div className="faq-answer-wrap" style={{ maxHeight: isOpen ? "560px" : "0" }}>
                      <div className="faq-answer">{item.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="faq-right">
            <div className="faq-illustrationWrap" aria-hidden="true">
              <img className="faq-illustration" src={faqsIllustration} alt="" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: var(--section-padding) 0;
          background: var(--color-bg-light);
        }
        @media (max-width: 768px) {
          .faq-section { padding: var(--section-padding-mobile) 0; }
        }
        .faq-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .faq-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .faq-title {
          font-size: var(--text-h2);
          font-weight: var(--weight-bold);
          color: var(--color-text-primary);
        }
        .faq-subtitle{
          margin: 8px auto 0;
          max-width: 720px;
          color: var(--color-text-secondary);
        }
        .faq-layout{
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
          gap: 28px;
          align-items: stretch;
        }
        @media (max-width: 980px){
          .faq-layout{ grid-template-columns: 1fr; }
        }
        .faq-left{
          display: flex;
          min-width: 0;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(148,163,184,0.35);
          border-radius: 16px;
          box-shadow: var(--shadow-card);
          overflow: hidden;
        }
        .faq-item {
          border-bottom: 1px solid rgba(148,163,184,0.25);
        }
        .faq-item:last-child{ border-bottom: none; }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          text-align: left;
          transition: background 0.2s ease;
        }
        .faq-question:hover{
          background: rgba(99,102,241,0.06);
        }
        .faq-q-text {
          font-size: 1.05rem;
          font-weight: var(--weight-semibold);
          color: var(--color-text-primary);
          transition: color 0.2s;
        }
        .faq-item--open .faq-q-text {
          color: var(--color-primary);
        }
        .faq-toggle {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: rgba(100, 200, 80, 0.16);
          color: rgba(15, 23, 42, 0.75);
          display: grid;
          place-items: center;
          font-size: 1.1rem;
          font-weight: 900;
          flex-shrink: 0;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }
        .faq-item--open .faq-toggle {
          background: rgba(99,102,241,0.18);
          color: rgba(15,23,42,0.85);
          transform: rotate(90deg);
        }
        .faq-answer-wrap {
          overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .faq-answer {
          padding: 0 18px 18px 18px;
          color: var(--color-text-secondary);
          font-size: 0.9375rem;
          line-height: 1.75;
          white-space: pre-line;
        }

        .faq-right{
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }
        .faq-illustrationWrap{
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(148,163,184,0.25);
          border-radius: 18px;
          box-shadow: var(--shadow-card);
          padding: 24px;
          flex: 1 1 auto;
          min-height: 100%;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .faq-illustration{
          width: min(420px, 92%);
          height: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
        }
        @media (max-width: 980px){
          .faq-left{ display: block; }
          .faq-illustrationWrap{
            min-height: 300px;
          }
          .faq-illustration{
            height: auto;
          }
        }
        .faq-askCard{
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(148,163,184,0.35);
          border-radius: 18px;
          box-shadow: var(--shadow-card);
          padding: 18px;
        }
        .faq-askTitle{
          font-weight: 800;
          color: var(--color-text-primary);
          text-align: center;
          font-size: 1.05rem;
        }
        .faq-askSubtitle{
          margin-top: 6px;
          text-align: center;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .faq-form{
          margin-top: 14px;
        }
        .faq-label{
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: rgba(100,116,139,0.9);
          margin-bottom: 8px;
        }
        .faq-inputRow{
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .faq-input{
          width: 100%;
          height: 42px;
          border-radius: 12px;
          border: 1px solid rgba(148,163,184,0.35);
          background: rgba(255,255,255,0.9);
          padding: 0 12px;
          outline: none;
          font-family: var(--font-sans);
        }
        .faq-input:focus{
          border-color: rgba(99,102,241,0.55);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.14);
        }
        .faq-submit{
          height: 56px;
          border-radius: 16px;
          border: 0;
          cursor: pointer;
          background: transparent;
          box-shadow: none;
          transition: transform 160ms ease, filter 200ms ease;
          display: grid;
          place-items: center;
          padding: 0;
        }
        .faq-submit:hover{
          filter: saturate(1.05) brightness(0.98);
          transform: translateY(-1px);
        }
        .faq-submit:active{
          transform: translateY(1px);
        }
        .faq-submit:disabled{
          cursor: not-allowed;
          filter: grayscale(0.05) saturate(0.9);
          opacity: 0.9;
          transform: none;
        }
        .faq-submitInner{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          gap: 0;
        }
        .faq-submitAnimWrap{
          width: 200px;
          height: 54px;
          display: inline-block;
          position: relative;
          overflow: hidden;
        }
        .faq-submitAnimBase{
          position: absolute;
          inset: 0;
        }
        .faq-submitAnimOverlay{
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .faq-toast{
          margin-top: 10px;
          font-size: 0.85rem;
          color: rgba(15,23,42,0.75);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 200ms ease, transform 200ms ease;
          text-align: center;
          min-height: 18px;
        }
        .faq-error{
          margin-top: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          color: rgba(220, 38, 38, 0.92);
          text-align: center;
          min-height: 18px;
        }
        .faq-toast--show{
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
