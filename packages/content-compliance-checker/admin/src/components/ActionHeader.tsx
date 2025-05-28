import { Flex, Typography } from '@strapi/design-system';
import { ButtonGroup } from '@utrecht/component-library-react/dist/css-module';
import React, { type RefObject } from 'react';
import { GoBackButton } from './GoBackButton';
import { PrintButton } from './PrintButton';
import { RedirectButton } from './RedirectButton';

interface ActionHeaderProps {
  title: string;
  contentRef: RefObject<HTMLDivElement>;
  editLabel?: string;
  backLabel?: string;
  printLabel?: string;
  redirectTo?: string;
}

export const ActionHeader: React.FC<ActionHeaderProps> = ({
  title,
  contentRef,
  editLabel,
  backLabel,
  printLabel,
  redirectTo,
}) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" paddingBottom={4}>
      <Typography variant="alpha">{title}</Typography>
      <ButtonGroup className="utrecht-no-print">
        {redirectTo && <RedirectButton redirectTo={redirectTo}>{editLabel}</RedirectButton>}
        {backLabel && <GoBackButton>{backLabel}</GoBackButton>}
        {contentRef && printLabel && <PrintButton contentRef={contentRef}>{printLabel}</PrintButton>}
      </ButtonGroup>
    </Flex>
  );
};
