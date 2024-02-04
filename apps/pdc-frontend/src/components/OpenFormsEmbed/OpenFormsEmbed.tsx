'use client';

// @ts-ignore
import OpenForm from '@open-formulieren/sdk';
import '@open-formulieren/sdk/styles.css';
import Script from 'next/script';
import { useRef } from 'react';

export const OpenFormsEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onLoadOpenForms = () => {
    if (!containerRef.current) {
      return;
    }

    const form = new OpenForm(containerRef.current, containerRef.current.dataset);
    form.init();
  };

  return (
    <div>
      <div
        ref={containerRef}
        data-base-url="http://localhost:8000/api/v2/"
        data-form-id="f65657cb-2968-4a51-a576-2106e551e984"
        data-base-path="/en"
      ></div>
      <Script
        strategy={'afterInteractive'}
        src="@open-formulieren/sdk/dist/open-forms-sdk.js"
        onLoad={onLoadOpenForms}
      />
    </div>
  );
};
