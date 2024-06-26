import { HTMLAttributes, PropsWithChildren } from 'react';

export interface HTMLHeadingProps extends PropsWithChildren<HTMLAttributes<HTMLHeadingElement>> {
  level?: number;
}

export const HTMLHeading = ({ level, ...restProps }: HTMLHeadingProps) => {
  const HeadingX =
    level === 1
      ? 'h1'
      : level === 2
      ? 'h2'
      : level === 3
      ? 'h3'
      : level === 4
      ? 'h4'
      : level === 5
      ? 'h5'
      : level === 6
      ? 'h6'
      : 'p';

  return <HeadingX {...restProps} />;
};
