import { Box } from '@strapi/design-system/Box';
import { Table, Tbody, Td, Th, Thead, Tr } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import React from 'react';
import { RedirectButton } from '../RedirectButton'; // Adjust import path as needed

const getNestedValue = (obj: any, path: string): any => path.split('.').reduce((acc, key) => acc?.[key], obj);

interface EntityTableProps {
  headers: string[];
  data: Array<{ id: string | number; [key: string]: any }>;
  dataKeys: string[];
  redirectBasePath: string;
  redirectLabel?: string;
  actionHeader?: string;
}

export const EntityTable: React.FC<EntityTableProps> = ({
  headers,
  data,
  dataKeys,
  redirectBasePath,
  redirectLabel = 'Bekijk details',
  actionHeader = 'Acties',
}) => {
  return (
    <Box padding={8}>
      <Table colCount={3} rowCount={data?.length + 1}>
        <Thead>
          <Tr>
            {headers.map((header, index: number) => (
              <Th key={index}>{header}</Th>
            ))}
            <Th>{actionHeader}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              {dataKeys.map((key, index: number) => (
                <Td key={index}>
                  <Typography>{getNestedValue(item, key)}</Typography>
                </Td>
              ))}
              <Td>
                <RedirectButton redirectTo={`${redirectBasePath}/${item.id}`}>{redirectLabel}</RedirectButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
