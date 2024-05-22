'use client';

import Ed11y from 'editoria11y/dist/editoria11y.min.js';
import type { Ed11yOptions } from 'editoria11y/dist/editoria11y.min.js';
import { memo, useEffect, useRef } from 'react';

export const Editoria11y = memo(() => {
  const editorRef = useRef<Ed11y | null>(null);

  useEffect(() => {
    const options: Ed11yOptions = {
      lang: 'nl',
      theme: 'darkTheme',
    };
    if (editorRef.current === null) {
      editorRef.current = new Ed11y(options);
    }
  }, []);

  return null;
});
Editoria11y.displayName = 'Editoria11y';
