'use client';
import { defineCustomElements } from '@frameless/editoria11y/loader';
import { createElement, useEffect, useState } from 'react';

export const Editoria11yWrapper = () => {
  const [nonce, setNonce] = useState<string>('');

  useEffect(() => {
    defineCustomElements(window);
    // Get nonce from meta tag or document
    const nonceValue = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content') || '';
    setNonce(nonceValue);
  }, []);

  return createElement('frameless-editoria11y', {
    theme: 'darkTheme',
    language: 'nl',
    nonce: nonce,
  });
};
