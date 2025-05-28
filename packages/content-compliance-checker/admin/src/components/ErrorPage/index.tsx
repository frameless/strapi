import { Box, Button, Flex, Stack, Typography } from '@strapi/design-system';
import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { GoBackButton } from '../GoBackButton';

interface ErrorPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  buttonText?: string;
}

export const ErrorPage = ({ children, buttonText, ...restProps }: PropsWithChildren<ErrorPageProps>) => (
  <main {...restProps}>
    <Box padding={8}>
      <Typography variant="alpha" textColor="danger600">
        {children}
      </Typography>
      {buttonText && <GoBackButton>{buttonText}</GoBackButton>}
    </Box>
  </main>
);
