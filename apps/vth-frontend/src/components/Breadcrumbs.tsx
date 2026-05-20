'use client';

import { Breadcrumbs as UIBreadcrumbs } from '@frameless/ui';
import type { BreadcrumbNavProps } from '@utrecht/component-library-react';
import Link from 'next/link';
import { ComponentType } from 'react';

type BreadcrumbLinkType = { href: string; label: string; current: boolean };

interface BreadcrumbsProps extends BreadcrumbNavProps {
  links: BreadcrumbLinkType[];
  backLink?: BreadcrumbLinkType;
  label?: string;
}

export const Breadcrumbs = (props: BreadcrumbsProps) => <UIBreadcrumbs {...props} Link={Link as ComponentType<any>} />;
