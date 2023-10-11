'use client';
import Link from 'next/link';
import { BreadcrumbNav, BreadcrumbNavLink } from '@/components';

type BreadcrumbLinkType = {
  href: string;
  label: string;
  current: boolean;
};

interface BreadcrumbProps {
  links: BreadcrumbLinkType[];
}
export const Breadcrumbs = ({ links }: BreadcrumbProps) => {
  return (
    <BreadcrumbNav appearance="arrows" label="">
      {links &&
        links.length > 0 &&
        links.map(({ href, label, current }: any, index: number) =>
          label ? (
            <BreadcrumbNavLink
              href={href}
              key={href}
              rel={href === '/' ? 'home' : 'up'}
              index={index}
              current={current}
              Link={Link}
            >
              {label}
            </BreadcrumbNavLink>
          ) : null,
        )}
    </BreadcrumbNav>
  );
};
