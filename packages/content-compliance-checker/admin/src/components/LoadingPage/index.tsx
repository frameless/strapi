import { Box, Loader } from '@strapi/design-system';

export const LoadingPage = () => (
  <main aria-busy="true">
    <Box padding={8}>
      <Loader />
      <span className="utrecht-sr-only">Loading, please wait…</span>
    </Box>
  </main>
);
