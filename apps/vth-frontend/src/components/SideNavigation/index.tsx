import clsx from 'clsx';
import Link from 'next/link';
import React, { FC } from 'react';

export type LinkData = {
  title: string;
  slug: string;
  href: string;
  isCurrent: boolean;
};

export type SideNavigationProps = {
  links: LinkData[];
};

export const SideNavigation: FC<SideNavigationProps> = (props) => {
  const buildNavItem = (slug: string, title: string, href: string, isCurrent: boolean) => {
    return (
      <li key={`sidenav-thema-${slug}`} className={clsx('utrecht-sidenav__item')}>
        <Link
          aria-current={isCurrent ? 'page' : 'false'}
          className={clsx('utrecht-sidenav__link', 'utrecht-link', 'utrecht-link--html-a', {
            'utrecht-sidenav__link--current': isCurrent,
          })}
          href={href}
        >
          <svg
            className={clsx('utrecht-sidenav__marker', { 'utrecht-sidenav__marker--current': isCurrent })}
            viewBox="0 0 100 100"
            width="8"
            height="8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" fill="currentColor" />
          </svg>
          {title}
        </Link>
      </li>
    );
  };

  return (
    <nav className={'utrecht-sidenav'}>
      <ul className={'utrecht-sidenav__list'}>
        {props.links.map(({ slug, title, href, isCurrent }: LinkData) => buildNavItem(slug, title, href, isCurrent))}
      </ul>
    </nav>
  );
};
