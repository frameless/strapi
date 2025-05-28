import { Box, Stack, Typography } from '@strapi/design-system';
import { auth } from '@strapi/helper-plugin';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActionHeader } from '../../components/ActionHeader';
import { ErrorPage } from '../../components/ErrorPage';
import { LoadingPage } from '../../components/LoadingPage';
import { Sections } from '../../components/Sections';

type ProductWithFilteredBlocks = any;
const ProductDetailPage = () => {
  const token = auth.get('jwtToken');
  const contentRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductWithFilteredBlocks | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/content-compliance-checker/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch product');
        const data: ProductWithFilteredBlocks = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage buttonText="Back to Dashboard">Error: {error}</ErrorPage>;
  if (!product) return <ErrorPage buttonText="Back to Dashboard">Product not found</ErrorPage>;

  return (
    <main ref={contentRef}>
      <Box padding={8}>
        <ActionHeader
          title={product?.title}
          contentRef={contentRef}
          printLabel="Afdrukken"
          backLabel="Terug naar Dashboard"
          editLabel="Bewerken"
          redirectTo={`/content-manager/collection-types/api::product.product/${product?.id}`}
        />
        <Box marginTop={4}>
          <Typography variant="beta" paddingBottom={2}>
            Blokken zonder &quot;kennisartikelCategorie&quot; ({product?.sections?.length})
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
