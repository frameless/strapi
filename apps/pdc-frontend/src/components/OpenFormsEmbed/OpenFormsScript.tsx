'use client';

import Script from 'next/script';
import React, { useRef } from 'react';

export type OpenFormsScriptProps = {
  nonce: string;
  src: string;
  targetId: string;
};

interface OpenForm {
  new (_targetNode: Node, _opts: Object): OpenForm;

  init(): Promise<void>;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    OpenForms: {
      OpenForm: OpenForm;
    };
  }
}

export const OpenFormsScript = ({ targetId, nonce, src }: OpenFormsScriptProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onLoadOpenForms = () => {
    if (!ref.current) return;

    const target = ref.current.ownerDocument.getElementById(targetId);
    if (target && window.OpenForms) {
      const form = new window.OpenForms.OpenForm(target, target.dataset);
      form.init();
    }
  };

  return (
    <>
      <div ref={ref}></div>
      <Script nonce={nonce} strategy="afterInteractive" src={src} onLoad={onLoadOpenForms} />
    </>
  );
};
