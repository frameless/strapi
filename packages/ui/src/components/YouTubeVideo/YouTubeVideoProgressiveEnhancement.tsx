'use client';

import { useLayoutEffect, useRef } from 'react';
import { isHTMLElement } from '../../util/google-translate-event';

export type YouTubeVideoProgressiveEnhancementProps = {};

export const YouTubeVideoProgressiveEnhancement = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Find all YouTube video iframe element with `width` and `height` attributes,
  // and use those dimensions to set the CSS `aspect-ratio` property.
  useLayoutEffect(() => {
    const iframes = ref.current?.parentElement?.querySelectorAll<HTMLIFrameElement>(
      'iframe.utrecht-youtube-video[height][width]',
    );
    if (iframes) {
      Array.from(iframes).forEach((el) => {
        if (isHTMLElement(el)) {
          el.style.aspectRatio = `${el.getAttribute('width')} / ${el.getAttribute('height')}`;
        }
      });
    }
  });

  return <div ref={ref} hidden />;
};
