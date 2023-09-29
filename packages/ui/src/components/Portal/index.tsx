import React, { ForwardedRef, forwardRef, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children?: React.ReactNode;
  parent?: string;
  className?: string;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ children, parent, className }, ref: ForwardedRef<HTMLDivElement>) => {
    const el = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
      const target = parent ? document.querySelector(parent) : document.body;
      const classList = ['utrecht-portal'];
      if (className) className.split(' ').forEach((item: string) => classList.push(item));

      classList.forEach((item) => el.classList.add(item));

      target?.appendChild(el);

      return () => {
        target?.removeChild(el);
      };
    }, [el, parent, className]);

    // Forward the ref to the div element
    React.useImperativeHandle(ref, () => el);

    return ReactDOM.createPortal(children, el);
  },
);

Portal.displayName = 'Portal';
