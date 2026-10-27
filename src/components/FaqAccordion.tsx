import type { HTMLAttributes, ReactNode } from 'react';
import { InlineScript } from '../lib/inline-once';

interface Props extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export default function FaqAccordion({ children, ...rest }: Props) {
  return (
    <>
      <faq-accordion {...rest}>{children}</faq-accordion>
      <InlineScript name="faq-accordion" />
    </>
  );
}
