'use client';

import { ScrollToTopButton as UIScrollToTopButton, type ScrollToTopButtonProps } from '@frameless/ui';
import { UtrechtIconChevronUp } from '@utrecht/web-component-library-react';
import dynamic from 'next/dynamic';

const ScrollToTopButtonWithClient = (props: ScrollToTopButtonProps) => (
  <UIScrollToTopButton Icon={UtrechtIconChevronUp} {...props} />
);

export const ScrollToTopButton = dynamic(() => Promise.resolve(ScrollToTopButtonWithClient), { ssr: false });
