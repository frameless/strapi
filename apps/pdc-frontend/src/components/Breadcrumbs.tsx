'use client';

import { Breadcrumbs as UIBreadcrumbs } from '@frameless/ui';
import type { BreadcrumbNavProps } from '@utrecht/component-library-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ComponentType } from 'react';

type BreadcrumbLinkType = { href: string; label: string; current: boolean };

interface BreadcrumbsProps extends BreadcrumbNavProps {
  links: BreadcrumbLinkType[];
  backLink?: BreadcrumbLinkType;
  breakpoint?: number;
  label?: string;
}

const BreadcrumbsWithLink = (props: BreadcrumbsProps) => <UIBreadcrumbs {...props} Link={Link as ComponentType<any>} />;

export const Breadcrumbs = dynamic(() => Promise.resolve(BreadcrumbsWithLink), { ssr: false });
