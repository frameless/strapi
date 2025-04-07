import { Flex } from '@strapi/design-system/Flex';
import { Icon } from '@strapi/design-system/Icon';
import { ManyWays } from '@strapi/icons';
import React from 'react';
import styled from 'styled-components';

const IconBox = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.primary100};
  border: 1px solid ${({ theme }) => theme.colors.primary200};

  svg > path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

const ComboboxIcon = () => (
  <IconBox justifyContent="center" alignItems="center" width={7} height={6} hasRadius aria-hidden>
    <Icon as={ManyWays} />
  </IconBox>
);

export default ComboboxIcon;
