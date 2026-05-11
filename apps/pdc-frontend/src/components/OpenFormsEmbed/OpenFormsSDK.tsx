'use client';

import { useEffect, useRef } from 'react';

export type OpenFormsScriptProps = {
  targetId: string;
  apiUrl: string;
  formId: string;
  basePath: string;
  nonce?: string;
};

export const OpenFormsSDK = ({ targetId, apiUrl, formId, basePath, nonce }: OpenFormsScriptProps) => {
  // Guard against React strict-mode double-invocation and soft-navigation re-renders.
  // The SDK attaches a react-router instance to the DOM node; initialising it twice
  // on the same element would break routing.
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    initializedRef.current = true;

    // Dynamic import keeps the SDK out of the SSR bundle and defers the heavy
    // formio chunk until the form page is actually mounted in the browser.
    import('@open-formulieren/sdk').then(({ OpenForm }) => {
      new OpenForm(target, {
        baseUrl: apiUrl,
        formId,
        basePath,
        CSPNonce: nonce,
      })
        .init()
        .catch(console.error);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // All options are captured once at mount, the form never re-initialises on
  // soft navigation because the SDK manages its own routing from that point on.

  return null;
};
