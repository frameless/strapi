import { Box, Flex, Typography } from '@strapi/design-system';
import { auth } from '@strapi/helper-plugin';
import React, { useEffect, useRef, useState } from 'react';
import { EntityTable } from '../../components/EntityTable';
import { ErrorPage } from '../../components/ErrorPage';
import { LoadingPage } from '../../components/LoadingPage';
import { PrintButton } from '../../components/PrintButton';

const ProductFilterPage = () => {
  const token = auth.get('jwtToken');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/content-compliance-checker/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: any[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
              Producten met blokken die niet gecategoriseerd zijn als &quot;kennisartikel&quot;
            </Typography>
          </Box>
          <Box className="utrecht-no-print">
            <PrintButton contentRef={contentRef}>Afdrukken</PrintButton>
          </Box>
        </Flex>
      </Box>
      <EntityTable
        headers={['Product Titel', 'Ontbrekende blokken voor kennisartikelcategorieën']}
        data={products}
        dataKeys={['title', 'sections.length']}
        redirectBasePath="/plugins/content-compliance-checker/product-filter"
        redirectLabel="Bekijk details"
        actionHeader="Details"
      />
    </main>
  );
};

export default ProductFilterPage;
