'use client';

import { useState } from 'react';
import SiteShell from '@/components/SiteShell';
import styles from './faq.module.css';

const QUESTIONS: Array<[string, string, string]> = [
  ['investment', 'How much investment do I need to open a Mahalaxmi Telecom franchise store?', 'Investment ranges from approximately ₹15 lakh to ₹50 lakh, depending on the brand format and store size, which can range from 300 to 1000 sq ft.'],
  ['payback', 'How long does it take to recover my investment?', 'Most franchise partners see a payback period of 12 to 15 months, depending on location, footfall and sales volume.'],
  ['staffing', 'How many staff members does a store need?', 'A typical store runs well with two to three employees, depending on the format and footfall of the location.'],
  ['targets', 'Are there fixed sales targets for franchise partners?', 'No. Our franchise model is designed to offer stronger margins without imposed sales targets, so you can focus on sustainable growth at your own pace.'],
  ['support', 'What kind of support will I get after opening my store?', 'You will receive marketing support, a complete store launch process, bulk sourcing benefits, multiple financing tie-ups for customers, and ongoing guidance from our leadership and operations team.'],
  ['location', 'What kind of location is best suited for a franchise store?', 'A prime, high foot-traffic location with strong walk-in visibility gives a new store the best chance of hitting its growth targets early.'],
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Franchise FAQs</p>
            <h1 className={styles.heroTitle}>Straight answers, <span>no fine print.</span></h1>
            <p className={styles.heroDesc}>
              The questions retailers ask us most often before they open their first Mahalaxmi Telecom store.
            </p>
          </div>
        </section>

        <section className={styles.listSection} aria-label="Frequently asked questions">
          <div className={styles.listContainer}>
            {QUESTIONS.map(([id, question, answer], index) => {
              const open = openIndex === index;
              return (
                <div className={`${styles.item} ${open ? styles.itemOpen : ''}`} key={id}>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={open}
                    aria-controls={`faq-answer-${id}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.questionText}>{question}</span>
                    <span className={styles.icon} aria-hidden="true">{open ? '×' : '+'}</span>
                  </button>
                  <div className={styles.answer} id={`faq-answer-${id}`} role="region">
                    <div className={styles.answerInner}>
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
