'use client';

import dynamic from 'next/dynamic';

export * from '@utrecht/web-component-library-react';
export * from '@utrecht/component-library-react';
export * from '@frameless/ui';
export { Markdown } from './Markdown';
export const Breadcrumbs = dynamic(
  async () => {
    const Component = (await import('@frameless/ui')).Breadcrumbs;
    return { default: Component };
  },
  { ssr: false },
);
