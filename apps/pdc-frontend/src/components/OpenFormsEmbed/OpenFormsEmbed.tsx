'use client';
import { OpenFormsContainer } from '@utrecht/open-forms-container-react/dist/css';
import { usePathname } from 'next/navigation';
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
};

export const OpenFormsEmbed = ({ nonce, slug, apiUrl, sdkUrl, cssUrl, fallback }: OpenFormsEmbedProps) => {
  const id = useId();
  const pathname = usePathname();

  return (
    <RichText>
      <OpenFormsContainer>
        <OpenFormsNLDesignSystem targetId={id}>
          <div
            id={id}
            data-base-url={apiUrl}
            data-form-id={slug}
            data-base-path={pathname.split('/').slice(0, 4).join('/')}
          >
            {fallback}
          </div>
        </OpenFormsNLDesignSystem>
        <link rel="stylesheet" nonce={nonce} href={cssUrl} />
        <OpenFormsScript targetId={id} nonce={nonce} src={sdkUrl} />
      </OpenFormsContainer>
    </RichText>
  );
};
