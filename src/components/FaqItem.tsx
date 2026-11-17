import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';
import { css } from '../lib/css';

interface Props {
  question: string;
  id: string;
  index: number;
  numbered?: boolean;
  size?: 'md' | 'sm';
  variant?: 'default' | 'card';
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
  variant = 'default',
  answerClass,
  children,
  answerHtml,
}: Props) {
  if (variant === 'card') {
    const cardAnswer =
      'pt-4 border-t border-[#0A0A0B]/10 pl-8 sm:pl-10 font-body text-sm sm:text-base text-[#686759] leading-relaxed [&>*+*]:mt-3';

    return (
      <div
        className="faq-item group bg-white! rounded-2xl overflow-hidden border! border-[#0A0A0B]/10! transition-colors duration-200 hover:border-[#0A0A0B]/30! [&.is-open]:border-[#0E7490]! [&.is-open]:shadow-md"
        style={css(`--i: ${index};`)}
      >
        <h3 className="faq-head">
          <button
            type="button"
            id={`${id}-q`}
            className="faq-trigger w-full px-6 sm:px-8 py-6 text-left flex items-center justify-between gap-4 select-none cursor-pointer"
            aria-expanded="false"
            aria-controls={`${id}-p`}
          >
            <span className="flex items-center gap-4">
              {numbered && (
                <span className="font-mono text-xs sm:text-sm font-bold text-[#0E7490] shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <span className="font-display font-bold text-lg sm:text-xl text-[#0A0A0B]">{question}</span>
            </span>
            <span
              className="w-8 h-8 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[#0A0A0B] shrink-0"
              aria-hidden="true"
            >
              <Plus size={16} strokeWidth={2} className="group-[.is-open]:hidden" />
              <Minus size={16} strokeWidth={2} className="hidden group-[.is-open]:block" />
            </span>
          </button>
        </h3>

        <div className="faq-panel" id={`${id}-p`} role="region" aria-labelledby={`${id}-q`} suppressHydrationWarning>
          <div className="faq-panel-inner px-6 sm:px-8 pb-6">
            {answerHtml !== undefined ? (
              <div className={cardAnswer} dangerouslySetInnerHTML={{ __html: answerHtml }} />
            ) : (
              <div className={cardAnswer}>{children}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

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