import React, { useState } from "react";

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

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-header">
          <span className="section-badge">Help</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => toggle(i)}
                  type="button"
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="faq-answer-wrap" style={{ maxHeight: isOpen ? "600px" : "0" }}>
                  <div className="faq-answer">{item.a}</div>
                </div>
              </div>
            );
          })}
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
          max-width: 860px;
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
        .faq-list {
          display: flex;
          flex-direction: column;
        }
        .faq-item {
          border-bottom: 1px solid var(--color-border);
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          text-align: left;
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
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-primary-light);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .faq-item--open .faq-toggle {
          background: var(--color-primary);
          color: #fff;
        }
        .faq-answer-wrap {
          overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .faq-answer {
          padding: 0 0 20px;
          color: var(--color-text-secondary);
          font-size: 0.9375rem;
          line-height: 1.75;
          white-space: pre-line;
        }
      `}</style>
    </section>
  );
}
