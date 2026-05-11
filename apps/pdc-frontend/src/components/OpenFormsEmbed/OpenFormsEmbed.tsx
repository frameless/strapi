'use client';
import { OpenFormsContainer } from '@utrecht/open-forms-container-react/dist/css';
import { usePathname } from 'next/navigation';
import { type ReactNode, useId, useRef } from 'react';

import { RichText } from '../index';

import { OpenFormsNLDesignSystem } from './OpenFormsNLDesignSystem';
import { OpenFormsSDK } from './OpenFormsSDK';
import '@open-formulieren/sdk/styles.css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/open-forms-container-css/dist/index.css';
import './OpenFormsEmbed.scss';

export type OpenFormsEmbedProps = {
  nonce: string;
  slug: string;
  apiUrl: string;
  fallback?: ReactNode;
};

export const OpenFormsEmbed = ({ nonce, slug, apiUrl, fallback }: OpenFormsEmbedProps) => {
  const id = useId();
  const pathname = usePathname();

  // Capture the mount-time pathname only, the SDK's react-router changes the URL
  // as the user moves through steps, but we must not re-derive basePath from those
  // changes, as that would re-render OpenFormsScript and try to reinitialise the form.
  const basePathRef = useRef(pathname.split('/').slice(0, 4).join('/'));

  return (
    <RichText>
      <OpenFormsContainer>
        <OpenFormsNLDesignSystem targetId={id}>
          <div id={id}>{fallback}</div>
        </OpenFormsNLDesignSystem>
        <OpenFormsSDK targetId={id} apiUrl={apiUrl} formId={slug} basePath={basePathRef.current} nonce={nonce} />
      </OpenFormsContainer>
    </RichText>
  );
};
