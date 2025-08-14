import { OpenFormsContainer } from '@utrecht/open-forms-container-react/dist/css';
import React, { type ReactNode, useId } from 'react';
import { OpenFormsNLDesignSystem } from './OpenFormsNLDesignSystem';
import { OpenFormsScript } from './OpenFormsScript';
import '@open-formulieren/sdk/styles.css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/open-forms-container-css/dist/index.css';
import './OpenFormsEmbed.scss';
import { RichText } from '../index';

export type OpenFormsEmbedProps = {
  nonce: string;
  slug: string;
  apiUrl: string;
  sdkUrl: string;
  cssUrl: string;
  fallback?: ReactNode;
  basePath?: string;
};

export const OpenFormsEmbed = ({ nonce, slug, apiUrl, sdkUrl, cssUrl, fallback, basePath }: OpenFormsEmbedProps) => {
  const id = useId();

  return (
    <RichText>
      <OpenFormsContainer>
        <OpenFormsNLDesignSystem targetId={id}>
          <div id={id} data-base-url={apiUrl} data-form-id={slug} data-base-path={basePath}>
            {fallback}
          </div>
        </OpenFormsNLDesignSystem>
        <link rel="stylesheet" nonce={nonce} href={cssUrl} />
        <OpenFormsScript targetId={id} nonce={nonce} src={sdkUrl} />
      </OpenFormsContainer>
    </RichText>
  );
};
