import clsx from 'clsx';
import Link from 'next/link';
import { FC, useId } from 'react';
import { UtrechtIconChevronRight } from '../Icons';

export type BreadcrumbNavigationElement = {
  title: string;
  href: string;
  isCurrent?: boolean;
};

export type BreadcrumbNavigationProps = {
  navigationElements: BreadcrumbNavigationElement[];
};

export const BreadcrumbNavigation: FC<BreadcrumbNavigationProps> = ({ navigationElements }) => {
  const labelId = useId();

  return (
    <nav className="utrecht-breadcrumb-nav utrecht-breadcrumb-nav--html-ol" aria-labelledby={labelId}>
      <h2 className="utrecht-heading-2 utrecht-breadcrumb-nav__heading" id={labelId} aria-hidden="true">
        Kruimelpad:
      </h2>
      <ol
        id={'breadcrumb-list'}
        className="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol"
        itemType="https://schema.org/BreadcrumbList"
      >
        <li className="utrecht-breadcrumb-nav__item" itemType="https://schema.org/ListItem" itemProp="itemListElement">
          <Link
            href="/"
            className="utrecht-link utrecht-link--html-a utrecht-breadcrumb-nav__link"
            rel="home"
            itemProp="item"
          >
            <span className="utrecht-breadcrumb-nav__text" itemProp="name">
              Home
            </span>
            <meta itemProp="position" content="1" />
          </Link>
        </li>
        {navigationElements?.map(({ title, href, isCurrent }, index) => (
          <>
            <li
              key={`breadcrumb-separator-${index}`}
              aria-hidden="true"
              className="utrecht-breadcrumb-nav__separator utrecht-breadcrumb-nav__separator--html-li"
            >
              <UtrechtIconChevronRight />
            </li>
            <li
              key={`breadcrumb-item-${title}`}
              className="utrecht-breadcrumb-nav__item"
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <Link
                href={href}
                className={clsx('utrecht-link utrecht-link--html-a', 'utrecht-breadcrumb-nav__link', {
                  ['utrecht-breadcrumb-nav__link--current utrecht-breadcrumb-nav__link--disabled']: isCurrent,
                })}
                itemProp="item"
                aria-current={isCurrent ? 'page' : false}
                aria-disabled={isCurrent ? 'true' : false}
              >
                <span className="utrecht-breadcrumb-nav__text" itemProp="name">
                  {title}
                </span>
                <meta itemProp="position" content={`${index + 1}`} />
              </Link>
            </li>
          </>
        ))}
      </ol>
    </nav>
  );
};
