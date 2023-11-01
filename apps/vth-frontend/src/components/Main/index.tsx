import React, { PropsWithChildren } from 'react';
interface MainProps extends React.HTMLAttributes<HTMLElement> {}

export const Main = ({ children, ...restProps }: PropsWithChildren<MainProps>) => (
  <main className={'utrecht-main'} {...restProps}>
    {children}
  </main>
);
