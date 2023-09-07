import classnames from 'classnames/bind';
import React from 'react';
import { Link } from '@/components';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface ReactionLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export const ReactionLink: React.FC<ReactionLinkProps> = ({ href, children, ...restProps }) => (
  <Link className={css('utrecht-reaction-link')} href={href} rel="noopener noreferrer" external {...restProps}>
    <svg
      className={css('utrecht-reaction-link__icon')}
      width="1em"
      height="1em"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_413_6949)">
        <path
          d="M1.5 0.999999L7.5 7L1.5 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_413_6949">
          <rect width="1em" height="1em" fill="currentColor" transform="translate(0.5 14) rotate(-90)" />
        </clipPath>
      </defs>
    </svg>
    {children}
  </Link>
);
