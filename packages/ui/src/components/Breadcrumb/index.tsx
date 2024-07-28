import {
  BreadcrumbNav,
  BreadcrumbNavLink,
  BreadcrumbNavSeparator,
  Link as UtrechtLink,
} from '@utrecht/component-library-react';
import type { BreadcrumbNavProps } from '@utrecht/component-library-react';
import { UtrechtIconChevronLeft, UtrechtIconChevronRight } from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import { ComponentType, Fragment } from 'react';
import './index.module.scss';
import styles from './index.module.scss';
import { useScreenSize } from '../../hooks';

export const extendLink = (link: BreadcrumbLinkType) => ({
  // Use default `rel`, but actual optional rel should override this
  rel: link.current ? undefined : link.href === '/' ? 'home' : 'up',
  ...link,
});

const css = classnames.bind(styles);
type BreadcrumbLinkType = {
  href: string;
  label: string;
  current: boolean;
  rel?: string;
};

interface BreadcrumbProps extends BreadcrumbNavProps {
  links: BreadcrumbLinkType[];
  Link?: ComponentType<any>;
  backLink?: BreadcrumbLinkType;
  breakpoint?: number;
}

export const Breadcrumbs = ({
  links,
  Link = UtrechtLink,
  backLink,
  breakpoint = 360,
  ...restBreadcrumbProps
}: BreadcrumbProps) => {
  const screenSize = useScreenSize();

  const smallScreen = Number(screenSize) <= breakpoint;

  const linkData = links.map(extendLink);
  const backLinkData = backLink && extendLink(backLink);

  if (
    (smallScreen && backLinkData?.href && backLinkData.label) ||
    (links.length === 1 && backLinkData?.href && backLinkData.label)
  ) {
    return (
      <BreadcrumbNav {...restBreadcrumbProps}>
        <BreadcrumbNavLink
          className={css('utrecht-link', 'utrecht-link--html-a')}
          href={backLinkData.href}
          rel={backLinkData.rel}
          current={backLinkData.current}
          Link={Link}
        >
          {backLinkData?.rel === 'up' && <UtrechtIconChevronLeft />} {backLinkData.label}
        </BreadcrumbNavLink>
      </BreadcrumbNav>
    );
  }

  return (
    <BreadcrumbNav {...restBreadcrumbProps}>
      {linkData
        .filter(({ label }) => label)
        .map(({ href, label, current, rel }: any, index: number) => (
          <Fragment key={`${href}-${index}`}>
            <BreadcrumbNavLink
              className={css('utrecht-link', 'utrecht-link--html-a')}
              href={href}
              rel={rel}
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
          </Fragment>
        ))}
    </BreadcrumbNav>
  );
};
