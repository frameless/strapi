import { forwardRef } from 'react';

interface NavigationIconProps {
  name: string;
  ariaHidden?: boolean;
}

export const NavigationIcon = forwardRef<SVGSVGElement, NavigationIconProps>(
  ({ name, ariaHidden = true, ...restProps }, ref) => (
    <svg
      className="utrecht-topnav__icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
      ref={ref}
      {...restProps}
    >
      {name === 'hamburger' && (
        <g>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </g>
      )}
      {name === 'close' && (
        <g>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </g>
      )}
    </svg>
  ),
);

NavigationIcon.displayName = 'NavigationIcon';
