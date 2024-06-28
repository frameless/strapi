import type { HeadingProps } from '@utrecht/component-library-react';
import { DetailedHTMLProps, ForwardedRef, HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef, useId } from 'react';
import { HTMLHeading } from '../HTMLHeading';

export interface NavProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  /**
   * Label of the navigation landmark.
   */
  label?: string;

  /**
   * Heading level for the navigation landmark heading.
   *
   * Configuring this helps to make the website understandable when the CSS cannot be loaded.
   * The visual hierarchy is still present because of the default styling of HTML.
   */
  headingLevel?: number;
  headingRestProps?: HeadingProps;
}

/**
 * Component for navigation landmarks with an accessible label that can be translated by Google Translate.
 */
export const Nav = forwardRef(
  (
    { children, label, headingLevel, className, headingRestProps, ...restProps }: PropsWithChildren<NavProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const headingId = label ? useId() : undefined;

    return (
      <nav ref={ref} className={className} aria-labelledby={headingId} {...restProps}>
        {label && (
          <HTMLHeading id={headingId} level={headingLevel} aria-hidden="true" hidden {...headingRestProps}>
            {label}
          </HTMLHeading>
        )}
        {children}
      </nav>
    );
  },
);
Nav.displayName = 'SocialMediaNav';
