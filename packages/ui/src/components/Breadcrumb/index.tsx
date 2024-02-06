import {
  BreadcrumbNav,
  BreadcrumbNavLink,
  BreadcrumbNavSeparator,
  Link as UtrechtLink,
} from '@utrecht/component-library-react';
import { UtrechtIconChevronLeft, UtrechtIconChevronRight } from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import { ComponentType } from 'react';
import styles from './index.module.scss';
import { useScreenSize } from '../../hooks';

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
const css = classnames.bind(styles);

export const Breadcrumbs = ({ links, Link = UtrechtLink, backLink, breakpoint = 360 }: BreadcrumbProps) => {
  const screenSize = useScreenSize();

  const smallScreen = Number(screenSize) <= breakpoint;

  if (smallScreen && backLink?.href && backLink.label) {
    return (
      <BreadcrumbNav>
        <div className={css('utrecht-breadcrumb-nav__item-wrapper')}>
          {backLink?.label?.toLowerCase() !== 'home' && (
            <BreadcrumbNavSeparator>
              <UtrechtIconChevronLeft />
            </BreadcrumbNavSeparator>
          )}
          <BreadcrumbNavLink
            className="utrecht-link utrecht-link--html-a"
            href={backLink.href}
            rel={backLink.href === '/' ? 'home' : 'up'}
            current={backLink.current}
            Link={Link}
          >
            {backLink.label}
          </BreadcrumbNavLink>
        </div>
      </BreadcrumbNav>
    );
  }

  return (
    <BreadcrumbNav>
      {links &&
        links.length > 0 &&
        links.map(({ href, label, current }: any, index: number) =>
          label ? (
            <div key={`${href}-${index}`} className={css('utrecht-breadcrumb-nav__item-wrapper')}>
              {links.length === 1 && label?.toLowerCase() !== 'home' && (
                <BreadcrumbNavSeparator>
                  <UtrechtIconChevronLeft />
                </BreadcrumbNavSeparator>
              )}
              <BreadcrumbNavLink
                className="utrecht-link utrecht-link--html-a"
                href={href}
                rel={href === '/' ? 'home' : 'up'}
                index={index}
                current={current}
                Link={Link}
              >
                {label}
              </BreadcrumbNavLink>
              {index !== links.length - 1 && (
                <BreadcrumbNavSeparator>
                  <UtrechtIconChevronRight />
                </BreadcrumbNavSeparator>
              )}
            </div>
          ) : null,
        )}
    </BreadcrumbNav>
  );
};
