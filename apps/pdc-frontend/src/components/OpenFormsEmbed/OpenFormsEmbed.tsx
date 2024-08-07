import React, { type ReactNode, useId } from 'react';
import { OpenFormsScript } from './OpenFormsScript';
import '@open-formulieren/sdk/styles.css';
import './OpenFormsEmbed.scss';

export type OpenFormsEmbedProps = {
  nonce: string;
  basePath: string;
  slug: string;
  apiUrl: string;
  sdkUrl: string;
  cssUrl: string;
  fallback?: ReactNode;
};

export const OpenFormsEmbed = ({ nonce, basePath, slug, apiUrl, sdkUrl, cssUrl, fallback }: OpenFormsEmbedProps) => {
  const id = useId();

  return (
    <>
      <div id={id} data-base-url={apiUrl} data-form-id={slug} data-base-path={basePath}>
        {fallback}
      </div>
      <link rel="stylesheet" nonce={nonce} href={cssUrl} />
      <OpenFormsScript targetId={id} nonce={nonce} src={sdkUrl} />
    </>
  );
};
