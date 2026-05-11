'use client';

import { Navigation as UINavigation, type NavigationListType } from '@frameless/ui';
import dynamic from 'next/dynamic';
import { HTMLAttributes } from 'react';

interface NavigationProps extends HTMLAttributes<HTMLElement> {
  list: NavigationListType[];
  targetId?: string;
  mobileBreakpoint: number;
  toggleButton?: {
    openText?: string;
    closeText?: string;
  };
}

const NavigationWithClient = (props: NavigationProps) => <UINavigation {...props} />;

export const Navigation = dynamic(() => Promise.resolve(NavigationWithClient), { ssr: false });
