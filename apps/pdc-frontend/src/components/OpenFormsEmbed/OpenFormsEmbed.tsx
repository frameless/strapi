'use client';

import Script from 'next/script';
import React, { useRef } from 'react';

export type OpenFormsEmbedProps = {
  basePath: string;
  slug: string;
};

export const OpenFormsEmbed = ({ basePath, slug }: OpenFormsEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onLoadOpenForms = () => {
    if (!containerRef.current) {
      return;
    }

    // @ts-ignore
    const form = new window.OpenForms.OpenForm(containerRef.current, containerRef.current.dataset);
    form.init();
  };

  return (
    <div>
      <div
        ref={containerRef}
        data-base-url="http://localhost:8000/api/v2/"
        data-form-id={slug}
        data-base-path={basePath}
      ></div>
      <link rel="stylesheet" href="http://localhost:8000/static/sdk/open-forms-sdk.css" />
      <Script
        strategy={'afterInteractive'}
        src="http://localhost:8000/static/sdk/open-forms-sdk.js"
        onLoad={onLoadOpenForms}
      />
    </div>
  );
};
