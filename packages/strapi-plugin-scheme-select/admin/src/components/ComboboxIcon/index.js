import { Flex } from '@strapi/design-system/Flex';
import { Icon } from '@strapi/design-system/Icon';
import ManyToMany from '@strapi/icons/ManyToMany';
import React from 'react';
import styled from 'styled-components';

const IconBox = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;

function ComboboxIcon() {
  return (
    <IconBox justifyContent="center" alignItems="center" width={7} height={6} hasRadius aria-hidden>
      <Icon as={ManyToMany} />
    </IconBox>
  );
}

export default ComboboxIcon;
