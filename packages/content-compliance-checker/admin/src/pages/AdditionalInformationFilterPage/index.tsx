import { Box, Flex, Typography } from '@strapi/design-system';
import { auth } from '@strapi/helper-plugin';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { EntityTable } from '../../components/EntityTable';
import { ErrorPage } from '../../components/ErrorPage';
import { LoadingPage } from '../../components/LoadingPage';
import { PrintButton } from '../../components/PrintButton';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

const AdditionalInformationFilterPage = () => {
  const token = auth.get('jwtToken');
  const [additionalInformation, setAdditionalInformation] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const fetchAdditionalInformation = async () => {
      try {
        const response = await fetch('/content-compliance-checker/additional-information', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok)
          throw new Error(
            formatMessage({
              id: getTrad('additionalInformationPage.error'),
              defaultMessage: 'Fout bij het ophalen van aanvullende informatie',
            }),
          );
        const data: any[] = await response.json();
        setAdditionalInformation(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : formatMessage({
                id: getTrad('error.unknown'),
                defaultMessage: 'Er is een onbekende fout opgetreden',
              }),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalInformation();
  }, [token]);

  if (loading) return <LoadingPage />;
  if (error)
    return (
      <ErrorPage
        buttonText={formatMessage({
          id: getTrad('backToBDashboardButton.text'),
          defaultMessage: 'Terug naar Dashboard',
        })}
      >
        {formatMessage(
          {
            id: getTrad('errorPage.message'),
            defaultMessage: 'Fout bij het ophalen van aanvullende informatie',
          },
          { error },
        )}
      </ErrorPage>
    );

  return (
    <main ref={contentRef}>
      <Box padding={8}>
        <Flex justifyContent="space-between" alignItems="flex-start" wrap="wrap" gap={4}>
          <Box>
            <Typography variant="alpha" as="h2">
              {formatMessage({
                id: getTrad('filterDashboardPage.title'),
                defaultMessage: 'Dashboard voor inhoud naleving',
              })}
            </Typography>
            <Typography variant="epsilon" as="h3" marginTop={4}>
              {formatMessage({
                id: getTrad('additionalInformationFilterPage.subtitle'),
                defaultMessage: "Aanvullende informatie met blokken die niet gecategoriseerd zijn als 'kennisartikel'",
              })}
            </Typography>
          </Box>
          <Box className="utrecht-no-print">
            <PrintButton contentRef={contentRef}>
              {formatMessage({ id: getTrad('printButton.label'), defaultMessage: 'Afdrukken' })}
            </PrintButton>
          </Box>
        </Flex>
      </Box>
      <EntityTable
        headers={[
          formatMessage({ id: getTrad('entityTable.headers.title'), defaultMessage: 'Titel' }),
          formatMessage({
            id: getTrad('entityTable.headers.missingBlocks'),
            defaultMessage: 'Ontbrekende blokken voor kennisartikelcategorieën',
          }),
        ]}
        data={additionalInformation}
        dataKeys={['title', 'content.contentBlock.length']}
        redirectBasePath="/plugins/content-compliance-checker/additional-information-filter"
        redirectLabel={formatMessage({ id: getTrad('entityTable.redirectLabel'), defaultMessage: 'Bekijk details' })}
        actionHeader={formatMessage({ id: getTrad('entityTable.actionHeader'), defaultMessage: 'Details' })}
      />
    </main>
  );
};

export default AdditionalInformationFilterPage;
