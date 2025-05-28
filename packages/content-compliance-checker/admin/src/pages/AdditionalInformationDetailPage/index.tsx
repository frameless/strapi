import { Box, Stack, Typography } from '@strapi/design-system';
import { auth } from '@strapi/helper-plugin';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActionHeader } from '../../components/ActionHeader';
import { ErrorPage } from '../../components/ErrorPage';
import { LoadingPage } from '../../components/LoadingPage';
import { Sections } from '../../components/Sections';

type ProductWithFilteredBlocks = any;
const AdditionalInformationDetailPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const token = auth.get('jwtToken');
  const [additionalInformation, setAdditionalInformation] = useState<ProductWithFilteredBlocks | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchAdditionalInformation = async () => {
      try {
        const response = await fetch(`/content-compliance-checker/additional-information/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch product');
        const data: ProductWithFilteredBlocks = await response.json();
        setAdditionalInformation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalInformation();
  }, [id]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage buttonText="Back to Dashboard">Error: {error}</ErrorPage>;
  if (!additionalInformation)
    return <ErrorPage buttonText="Back to Dashboard">Additional Information not found</ErrorPage>;
  return (
    <main ref={contentRef}>
      <Box padding={8}>
        <ActionHeader
          title={additionalInformation?.title}
          contentRef={contentRef}
          printLabel="Afdrukken"
          backLabel="Terug naar Dashboard"
          editLabel="Bewerken"
          redirectTo={`/content-manager/collection-types/api::additional-information.additional-information/${additionalInformation?.id}`}
        />
        <Box marginTop={4}>
          <Typography variant="beta" paddingBottom={2}>
            Blokken zonder &quot;kennisartikelCategorie&quot; ({additionalInformation?.content?.contentBlock?.length})
          </Typography>

          <Stack spacing={4}>
            <Sections
              sections={additionalInformation?.content?.contentBlock?.map((block: any) => ({
                ...block,
                __component: 'components.utrecht-rich-text',
              }))}
              locale="nl"
            />
          </Stack>
        </Box>
      </Box>
    </main>
  );
};

export default AdditionalInformationDetailPage;
