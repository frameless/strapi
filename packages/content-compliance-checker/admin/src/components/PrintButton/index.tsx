import { Button } from '@strapi/design-system';
import type { ForwardedRef, PropsWithChildren, RefObject } from 'react';
import { forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface PrintButtonProps {
  contentRef: RefObject<HTMLDivElement>;
}

export const PrintButton = forwardRef<HTMLDivElement, PropsWithChildren<PrintButtonProps>>(
  ({ contentRef, children, ...restProps }, ref: ForwardedRef<HTMLDivElement>) => {
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
      <Button onClick={reactToPrintFn} ref={ref} {...restProps}>
        {children}
      </Button>
    );
  },
);

PrintButton.displayName = 'PrintButton';
