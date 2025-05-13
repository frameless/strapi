'use client';

import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { useOpenFormsWysiwygStyling } from './useOpenFormsWysiwygStyling';

interface OpenFormsNLDesignSystemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  targetId: string;
}

export const OpenFormsNLDesignSystem = ({
  targetId,
  children,
  ...restProps
}: PropsWithChildren<OpenFormsNLDesignSystemProps>) => {
  useOpenFormsWysiwygStyling(targetId);
  return <div {...restProps}>{children}</div>;
};
