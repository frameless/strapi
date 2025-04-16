'use client';

import { ButtonLink } from '@utrecht/component-library-react';
import type { ButtonLinkProps } from '@utrecht/component-library-react';
import dynamic from 'next/dynamic';
import Link, { LinkProps } from 'next/link';
import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { DecisionTreeFormSkeleton } from './Skeleton/DecisionTreeFormSkeleton';

export * from '@utrecht/web-component-library-react';
export * from '@utrecht/component-library-react';
export * from '@frameless/ui';
export const FloLegalForm = dynamic(
  async () => {
    const Component = (await import('./FloLegalForm')).FloLegalForm;
    return { default: Component };
  },
  {
    ssr: false,
    loading: () => <DecisionTreeFormSkeleton />,
  },
);
export { Markdown } from './Markdown';
export { MatomoTagManager } from './MatomoTagManager';
export { SiteImproveAnalytics } from './SiteImproveAnalytics';

// Overwrite `@frameless/ui` version with `"use client"` component
export { GoogleTranslate } from './GoogleTranslate';

export const Breadcrumbs = dynamic(
  async () => {
    const Component = (await import('@frameless/ui')).Breadcrumbs;
    return { default: Component };
  },
  { ssr: false },
);
export const MultiColumnsButton = dynamic(
  async () => {
    const Component = (await import('@frameless/ui')).MultiColumnsButton;
    return { default: Component };
  },
  { ssr: false },
);

interface IndexCharNavLinkProps extends LinkProps {}
// This component was built because the Next.js Link component requires an href.
export const IndexCharNavLink = forwardRef(
  (
    { href, children, ...restProps }: PropsWithChildren<IndexCharNavLinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    if (href)
      return (
        <Link ref={ref} href={href} {...restProps}>
          {children}
        </Link>
      );

    return (
      <ButtonLink ref={ref} {...(restProps as ButtonLinkProps)}>
        {children}
      </ButtonLink>
    );
  },
);

IndexCharNavLink.displayName = 'IndexCharNavLink';
