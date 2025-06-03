import { Box, Stack, Typography } from '@strapi/design-system';
import { auth } from '@strapi/helper-plugin';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActionHeader } from '../../components/ActionHeader';
import { ErrorPage } from '../../components/ErrorPage';
import { LoadingPage } from '../../components/LoadingPage';
import { Sections } from '../../components/Sections';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

type ProductWithFilteredBlocks = any;
const ProductDetailPage = () => {
  const token = auth.get('jwtToken');
  const contentRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductWithFilteredBlocks | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/content-compliance-checker/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok)
          throw new Error(
            formatMessage({
              id: getTrad('product.error'),
              defaultMessage: 'Fout bij het ophalen van product',
            }),
          );
        const data: ProductWithFilteredBlocks = await response.json();
        setProduct(data);
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

    fetchProduct();
  }, [id]);

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
            defaultMessage: 'Fout: {error}',
          },
          { error },
        )}
      </ErrorPage>
    );
  if (!product)
    return (
      <ErrorPage
        buttonText={formatMessage({
          id: getTrad('backToBDashboardButton.text'),
          defaultMessage: 'Terug naar Dashboard',
        })}
      >
        {formatMessage({
          id: getTrad('product.notFound'),
          defaultMessage: 'Product niet gevonden',
        })}
      </ErrorPage>
    );

  return (
    <main ref={contentRef}>
      <Box padding={8}>
        <ActionHeader
          title={product?.title}
          contentRef={contentRef}
          printLabel={formatMessage({ id: getTrad('printButton.label'), defaultMessage: 'Afdrukken' })}
          backLabel={formatMessage({
            id: getTrad('backToBDashboardButton.text'),
            defaultMessage: 'Terug naar Dashboard',
          })}
          editLabel={formatMessage({ id: getTrad('updateButton.text'), defaultMessage: 'Bewerken' })}
          redirectTo={`/content-manager/collection-types/api::product.product/${product?.id}`}
        />
        <Box marginTop={4}>
          <Typography variant="beta" paddingBottom={2}>
            {formatMessage(
              {
                id: getTrad('blocksWithoutCategory'),
                defaultMessage: 'Blokken zonder "kennisartikelCategorie" ({count})',
              },
              { count: product?.sections?.length ?? 0 },
            )}
          </Typography>

          <Stack spacing={4}>
            <Sections sections={product?.sections} locale={product?.locale} />
          </Stack>
        </Box>
      </Box>
    </main>
  );
};

export default ProductDetailPage;
