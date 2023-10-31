'use client';

import { AdvancedLink } from '@frameless/ui';
import { UtrechtFlexWrapFallback } from '@utrecht/web-component-library-react';
import { FC } from 'react';
import { BreadcrumbNavigation, BreadcrumbNavigationProps } from '@/components/BreadcrumbNavigation';

export type BacklinkProps = {
  href: string;
  title: string;
};

export interface BreadcrumbWithBacklinkProps {
  breadcrumbProps: BreadcrumbNavigationProps;
  backlinkProps: BacklinkProps;
}

export const BreadcrumbWithBacklink: FC<BreadcrumbWithBacklinkProps> = ({ breadcrumbProps, backlinkProps }) => {
  return (
    <UtrechtFlexWrapFallback flexTarget={'breadcrumb-list'}>
      <BreadcrumbNavigation {...breadcrumbProps} />
      <AdvancedLink icon={'chevronLeft'} slot={'fallback'} href={backlinkProps.href}>
        {backlinkProps.title}
      </AdvancedLink>
    </UtrechtFlexWrapFallback>
  );
};
