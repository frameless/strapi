import { Box, Flex, Status, Typography } from '@strapi/design-system';
import type { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

export const componentTypeMap: Record<string, string> = {
  'components.utrecht-rich-text': 'Content Block',
  'components.utrecht-logo-button': 'Call to Action',
  'components.utrecht-spotlight': 'Spotlight',
  'components.faq': 'FAQ',
  'components.utrecht-multi-columns-button': 'Multi-Columns Button',
  'components.utrecht-accordion': 'Accordion',
  'components.utrecht-image': 'Image',
  'components.utrecht-link': 'Link',
};
export interface BlockDetailProps {
  component: string;
  index: number;
}

export const BlockDetail = ({ component, index, children }: PropsWithChildren<BlockDetailProps>) => {
  const { formatMessage } = useIntl();
  return (
    <Box padding={4} background="neutral100" hasRadius>
      <Flex justifyContent="space-between" alignItems="center">
        <Typography variant="beta">
          {formatMessage(
            { id: getTrad('blockDetail.header'), defaultMessage: 'Blok {index} — Type: {type}' },
            { index: index + 1, type: componentTypeMap[component] },
          )}
        </Typography>
        <Status variant="warning">
          {formatMessage({
            id: getTrad('blockDetail.missingCategory'),
            defaultMessage: 'Ontbrekende kennisartikelcategorie',
          })}
        </Status>
      </Flex>
      <Box background="neutral0" padding={4} hasRadius marginTop={2}>
        {children}
      </Box>
    </Box>
  );
};
