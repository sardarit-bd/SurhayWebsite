import clsx from 'clsx';
import type { ReactNode } from 'react';
import { css } from '../lib/css';

interface Props {
  question: string;
  id: string;
  index: number;
  numbered?: boolean;
  size?: 'md' | 'sm';
  answerClass?: string;
  children?: ReactNode;
  answerHtml?: string;
}

export default function FaqItem({
  question,
  id,
  index,
  numbered = false,
  size = 'md',
  answerClass,
  children,
  answerHtml,
}: Props) {
  const triggerSize = size === 'sm' ? 'py-5 text-[1.05rem] md:text-lg' : 'py-6 text-lg md:text-xl';
  const answer =
    answerClass ?? (size === 'sm' ? 'prose max-w-none pb-6 pr-14 text-mute' : 'prose max-w-none pb-7 pr-14 text-mute');
  const answerStyle = size === 'sm' ? 'font-size: 0.96rem;' : 'font-size: 0.98rem;';

  return (
    <div className="faq-item" style={css(`--i: ${index};`)}>
      <h3 className="faq-head">
        <button
          type="button"
          id={`${id}-q`}
          className={clsx([
            'faq-trigger flex w-full cursor-pointer items-center justify-between gap-6 text-left font-display font-semibold tracking-tight',
            triggerSize,
          ])}
          aria-expanded="false"
          aria-controls={`${id}-p`}
        >
          <span className="flex items-baseline gap-4">
            {numbered && <span className="faq-num text-sm font-semibold">{String(index + 1).padStart(2, '0')}</span>}
            <span>{question}</span>
          </span>
          <span className="faq-icon" aria-hidden="true">
            <span className="faq-glyph">
              <span className="faq-bar faq-bar-v"></span>
              <span className="faq-bar faq-bar-h"></span>
            </span>
          </span>
        </button>
      </h3>

      <div className="faq-panel" id={`${id}-p`} role="region" aria-labelledby={`${id}-q`} suppressHydrationWarning>
        {answerHtml !== undefined ? (
          <div
            className={clsx(['faq-panel-inner', answer])}
            style={css(answerStyle)}
            dangerouslySetInnerHTML={{ __html: answerHtml }}
          />
        ) : (
          <div className={clsx(['faq-panel-inner', answer])} style={css(answerStyle)}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
