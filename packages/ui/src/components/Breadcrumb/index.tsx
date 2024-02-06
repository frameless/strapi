import {
  BreadcrumbNav,
  BreadcrumbNavLink,
  BreadcrumbNavSeparator,
  Link as UtrechtLink,
} from '@utrecht/component-library-react';
import { UtrechtIconChevronLeft, UtrechtIconChevronRight } from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import { ComponentType, Fragment } from 'react';
import './index.module.scss';
import styles from './index.module.scss';
import { useScreenSize } from '../../hooks';

const css = classnames.bind(styles);
type BreadcrumbLinkType = {
  href: string;
  label: string;
  current: boolean;
};
interface BreadcrumbProps {
  links: BreadcrumbLinkType[];
  Link?: ComponentType<any>;
  backLink?: {
    href: string;
    label: string;
    current: boolean;
  };
  breakpoint?: number;
}

export const Breadcrumbs = ({ links, Link = UtrechtLink, backLink, breakpoint = 360 }: BreadcrumbProps) => {
  const screenSize = useScreenSize();

  const smallScreen = Number(screenSize) <= breakpoint;

  if (smallScreen && backLink?.href && backLink.label) {
    return (
      <BreadcrumbNav className={css('utrecht-breadcrumb-nav-theme')}>
        <Fragment>
          <BreadcrumbNavLink
            className={css('utrecht-link', 'utrecht-link--html-a', 'utrecht-breadcrumb-nav__link-custom')}
            href={backLink.href}
            rel={backLink.href === '/' ? 'home' : 'up'}
            current={backLink.current}
            Link={Link}
          >
            {backLink?.label?.toLowerCase() !== 'home' && (
              <BreadcrumbNavSeparator>
                <UtrechtIconChevronLeft />
              </BreadcrumbNavSeparator>
            )}
            {backLink.label}
          </BreadcrumbNavLink>
        </Fragment>
      </BreadcrumbNav>
    );
  }

  return (
    <BreadcrumbNav className={css('utrecht-breadcrumb-nav-theme')}>
      {links &&
        links.length > 0 &&
        links.map(({ href, label, current }: any, index: number) =>
          label ? (
            <Fragment key={`${href}-${index}`}>
              <BreadcrumbNavLink
                className={css('utrecht-link', 'utrecht-link--html-a', 'utrecht-breadcrumb-nav__link-custom')}
                href={href}
                rel={href === '/' ? 'home' : 'up'}
                index={index}
                current={current}
                Link={UtrechtLink}
              >
                {links.length === 1 && label?.toLowerCase() !== 'home' && (
                  <BreadcrumbNavSeparator>
                    <UtrechtIconChevronLeft />
                  </BreadcrumbNavSeparator>
                )}
                {label}
                {index !== links.length - 1 && (
                  <BreadcrumbNavSeparator>
                    <UtrechtIconChevronRight />
                  </BreadcrumbNavSeparator>
                )}
              </BreadcrumbNavLink>
            </Fragment>
          ) : null,
        )}
    </BreadcrumbNav>
  );
};
