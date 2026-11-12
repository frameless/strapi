'use client';

import {
  BreadcrumbNav,
  BreadcrumbNavLink,
  BreadcrumbNavSeparator,
  Link as UtrechtLink,
} from '@utrecht/component-library-react';
import type { BreadcrumbNavProps } from '@utrecht/component-library-react';
import { UtrechtIconChevronLeft, UtrechtIconChevronRight } from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import { ComponentType, Fragment, PropsWithChildren } from 'react';

import styles from './index.module.css';

const css = classnames.bind(styles);

/**
 * `BreadcrumbNavSeparator` from `@utrecht/component-library-react` renders an inline
 * `style="display: …"` attribute, which is blocked by our Content-Security-Policy
 * (`style-src` without `'unsafe-inline'`). We drop the inline style and apply the
 * same declaration via the stylesheet instead (see `index.module.css`).
 */
const Separator = ({ children }: PropsWithChildren) => (
  <BreadcrumbNavSeparator style={undefined} className={css('utrecht-breadcrumb-nav__separator')}>
    {children}
  </BreadcrumbNavSeparator>
);

type BreadcrumbLinkType = {
  href: string;
  label: string;
  current: boolean;
};

interface BreadcrumbProps extends BreadcrumbNavProps {
  links: BreadcrumbLinkType[];
  Link?: ComponentType<any>;
  backLink?: {
    href: string;
    label: string;
    current: boolean;
  };
  label?: string;
}

export const Breadcrumbs = ({
  links,
  Link = UtrechtLink,
  backLink,
  label,
  ...restBreadcrumbProps
}: BreadcrumbProps) => {
  const hasBackLink = backLink?.href && backLink.label;

  return (
    <>
      {hasBackLink && (
        <div className={css('utrecht-breadcrumb-nav__mobile-view')}>
          <BreadcrumbNav className={css('utrecht-breadcrumb-nav-theme')} {...restBreadcrumbProps}>
            {backLink.label.toLowerCase() !== 'home' && (
              <Separator>
                <UtrechtIconChevronLeft />
              </Separator>
            )}
            <BreadcrumbNavLink
              className={css('utrecht-link', 'utrecht-link--html-a', 'utrecht-breadcrumb-nav__link-custom')}
              href={backLink.href}
              rel={backLink.href === '/' ? 'home' : 'up'}
              current={backLink.current}
              Link={Link}
            >
              {backLink.label}
            </BreadcrumbNavLink>
          </BreadcrumbNav>
        </div>
      )}
      <div className={css(hasBackLink ? 'utrecht-breadcrumb-nav__full-view' : undefined)}>
        <BreadcrumbNav className={css('utrecht-breadcrumb-nav-theme')} label={label} {...restBreadcrumbProps}>
          {links &&
            links.length > 0 &&
            links
              .filter(({ label }) => label)
              .map(({ href, label, current }: any, index: number) => (
                <Fragment key={`${href}-${index}`}>
                  {links.length === 1 && label?.toLowerCase() !== 'home' && (
                    <Separator>
                      <UtrechtIconChevronLeft />
                    </Separator>
                  )}
                  <BreadcrumbNavLink
                    className={css('utrecht-link', 'utrecht-link--html-a', 'utrecht-breadcrumb-nav__link-custom')}
                    href={href}
                    rel={href === '/' ? 'home' : 'up'}
                    index={index}
                    current={current}
                    Link={UtrechtLink}
                  >
                    {label}
                  </BreadcrumbNavLink>
                  {index !== links.length - 1 && (
                    <Separator>
                      <UtrechtIconChevronRight />
                    </Separator>
                  )}
                </Fragment>
              ))}
        </BreadcrumbNav>
      </div>
    </>
  );
};
