import React from 'react';
import styled from 'styled-components';
import { Icon } from '@strapi/design-system/Icon';
import { Flex } from '@strapi/design-system/Flex';
import Globe from '@strapi/icons/Globe';

const IconBox = styled(Flex)`
    background-color: #f0f0ff; /* primary100 */
    border: 1px solid #d9d8ff; /* primary200 */
    
    svg > path {
        fill: #4945ff; /* primary600 */
    }
`;

const ComboboxIcon = () => {
    return (
        <IconBox justifyContent="center" alignItems="center" width={7} height={6} hasRadius aria-hidden>
            <Icon as={Globe} />
        </IconBox>
    );
};

export default ComboboxIcon;