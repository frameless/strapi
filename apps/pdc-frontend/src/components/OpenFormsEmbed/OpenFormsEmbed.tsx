'use client';

import '@open-formulieren/sdk/styles.css';
import Script from 'next/script';
import React, { useRef } from 'react';

export type OpenFormsEmbedProps = {
  nonce: string;
  basePath: string;
  slug: string;
  apiUrl: string;
  sdkUrl: string;
  cssUrl: string;
};

export const OpenFormsEmbed = ({ nonce, basePath, slug, apiUrl, sdkUrl, cssUrl }: OpenFormsEmbedProps) => {
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
      <div ref={containerRef} data-base-url={apiUrl} data-form-id={slug} data-base-path={basePath}></div>
      <link rel="stylesheet" nonce={nonce} href={cssUrl} />
      <Script nonce={nonce} strategy={'afterInteractive'} src={sdkUrl} onLoad={onLoadOpenForms} />
    </div>
  );
};
