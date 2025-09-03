'use client';
import { defineCustomElements } from '@frameless/editoria11y/loader';
import { createElement, useEffect } from 'react';

export const Editoria11yWrapper = () => {
  useEffect(() => {
    defineCustomElements(window);
  }, []);
  return createElement('frameless-editoria11y', {
    theme: 'darkTheme',
    language: 'nl',
  });
};
