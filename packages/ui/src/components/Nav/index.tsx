import { Heading } from '@utrecht/component-library-react';
import type { HeadingProps } from '@utrecht/component-library-react';
import { DetailedHTMLProps, ForwardedRef, HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef, useId } from 'react';

export interface NavProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  label?: string;
  headingLevel?: number;
  headingRestProps?: HeadingProps;
}

export const Nav = forwardRef(
  (
    { children, label, headingLevel = 3, className, headingRestProps, ...restProps }: PropsWithChildren<NavProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const headingId = label ? useId() : undefined;

    return (
      <nav ref={ref} className={className} aria-labelledby={headingId} {...restProps}>
        {label && (
          <Heading id={headingId} level={headingLevel} aria-hidden="true" hidden {...headingRestProps}>
            {label}
          </Heading>
        )}
        {children}
      </nav>
    );
  },
);
Nav.displayName = 'SocialMediaNav';
