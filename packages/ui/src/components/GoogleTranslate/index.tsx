'use client';

import { useEffect, useRef } from 'react';
import { initGoogleTranslateAdaptation } from '../../util/google-translate-adaptation';
import { initGoogleTranslateEvent } from '../../util/google-translate-event';

export const GoogleTranslate = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      initGoogleTranslateAdaptation(ref.current?.ownerDocument);
      initGoogleTranslateEvent(ref.current?.ownerDocument);
    }
  }, []);
  return <div ref={ref} hidden />;
};
