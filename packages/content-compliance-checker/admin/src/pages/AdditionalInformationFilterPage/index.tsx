import { Box, Flex, Typography } from '@strapi/design-system';
import { auth } from '@strapi/helper-plugin';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { EntityTable } from '../../components/EntityTable';
import { ErrorPage } from '../../components/ErrorPage';
import { LoadingPage } from '../../components/LoadingPage';
import { PrintButton } from '../../components/PrintButton';

const AdditionalInformationFilterPage = () => {
  const token = auth.get('jwtToken');
  const [additionalInformation, setAdditionalInformation] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAdditionalInformation = async () => {
      try {
        const response = await fetch('/content-compliance-checker/additional-information', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch additional information');
        const data: any[] = await response.json();
        setAdditionalInformation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalInformation();
  }, [token]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage buttonText="Back to Dashboard">Error: {error}</ErrorPage>;

  return (
    <main ref={contentRef}>
      <Box padding={8}>
        <Flex justifyContent="space-between" alignItems="flex-start" wrap="wrap" gap={4}>
          <Box>
            <Typography variant="alpha" as="h2">
              Dashboard voor inhoud naleving
            </Typography>
            <Typography variant="epsilon" as="h3" marginTop={4}>
              Aanvullende informatie met blokken die niet gecategoriseerd zijn als &quot;kennisartikel&quot;
            </Typography>
          </Box>
          <Box className="utrecht-no-print">
            <PrintButton contentRef={contentRef}>Afdrukken</PrintButton>
          </Box>
        </Flex>
      </Box>
      <EntityTable
        headers={['Aanvullende informatie titel', 'Ontbrekende blokken voor kennisartikelcategorieën']}
        data={additionalInformation}
        dataKeys={['title', 'content.contentBlock.length']}
        redirectBasePath="/plugins/content-compliance-checker/additional-information-filter"
        redirectLabel="Bekijk details"
        actionHeader="Details"
      />
    </main>
  );
};

export default AdditionalInformationFilterPage;
