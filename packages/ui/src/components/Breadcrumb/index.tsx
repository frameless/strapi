import { BreadcrumbNav, BreadcrumbNavLink, BreadcrumbNavSeparator } from '@utrecht/component-library-react';
import { UtrechtIconChevronLeft, UtrechtIconChevronRight } from '@utrecht/web-component-library-react';
import Link from 'next/link';
import { Fragment } from 'react';
import { useScreenSize } from '../../hooks';

type BreadcrumbLinkType = {
  href: string;
  label: string;
  current: boolean;
};
interface BreadcrumbProps {
  links: BreadcrumbLinkType[];
}

export const Breadcrumbs = ({ links }: BreadcrumbProps) => {
  const screenSize = useScreenSize();

  const currentIndex = links.findIndex((link) => link.current);

  const previousLink = links[currentIndex - 1];

  const smallScreen = Number(screenSize) <= 360;

  if (smallScreen) {
    return (
      <BreadcrumbNav>
        <BreadcrumbNavSeparator>
          <UtrechtIconChevronLeft />
        </BreadcrumbNavSeparator>
        <BreadcrumbNavLink
          className="utrecht-link utrecht-link--html-a"
          href={previousLink.href}
          rel={previousLink.href === '/' ? 'home' : 'up'}
          index={currentIndex}
          current={previousLink.current}
          Link={Link}
        >
          {previousLink.label}
        </BreadcrumbNavLink>
      </BreadcrumbNav>
    );
  }
  return (
    <BreadcrumbNav>
      {links &&
        links.length > 0 &&
        links.map(({ href, label, current }: any, index: number) =>
          label ? (
            <Fragment key={`${href}-${index}`}>
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
              <BreadcrumbNavSeparator>
                <UtrechtIconChevronRight />
              </BreadcrumbNavSeparator>
            </Fragment>
          ) : null,
        )}
    </BreadcrumbNav>
  );
};
