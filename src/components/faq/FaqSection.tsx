import FaqSchema from '@/components/seo/FaqSchema';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  title?: string;
  items: FaqItem[];
}

/**
 * Визуальный FAQ-блок + JSON-LD для Schema.org/FAQPage.
 * Использует нативный <details>/<summary> — без JS, доступно с клавиатуры.
 */
export default function FaqSection({ title = 'Частые вопросы', items }: Props) {
  return (
    <section
      className="section-container py-12 md:py-16"
      aria-labelledby="faq-heading"
    >
      <FaqSchema items={items} />

      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-heading"
          className="font-semibold tracking-tight mb-8 text-center"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            letterSpacing: '-0.025em',
            color: 'var(--color-text)',
          }}
        >
          {title}
        </h2>

        <div className="space-y-2">
          {items.map((it, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden transition-colors hover:border-[var(--color-border-light)]"
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-[15px] md:text-[16px] font-medium select-none"
                style={{ color: 'var(--color-text)' }}
              >
                <span>{it.question}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                  style={{ color: 'var(--color-text-secondary)' }}
                  aria-hidden
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div
                className="px-5 pb-5 text-[14px] md:text-[15px] leading-relaxed whitespace-pre-line"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {it.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
