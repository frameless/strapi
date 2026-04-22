import type { ErrorPageData, ObjectByUUID } from '../types';

interface RenderLayoutProps {
  app: string;
  vacData?: ObjectByUUID;
  kennisartikelData?: ObjectByUUID;
  status?: 'DRAFT' | 'PUBLISHED';
  title?: string;
  errorPageData?: ErrorPageData;
}
// base path prefix for the overige-objecten-api service.
// required when the service is served under a sub-path on a shared domain (e.g. DigitalOcean App Platform).
// example: '/overige-objecten-api' when routed via ingress on a shared domain.
// leave empty ('') when the service runs on its own dedicated domain (e.g. Docker, standalone deployment).
const basePath = process.env.OVERIGE_OBJECTEN_API_BASE_PATH || '';
export const renderLayout = ({ app, vacData, kennisartikelData, status, title, errorPageData }: RenderLayoutProps) => `
<!DOCTYPE html>
<html lang="nl" class='utrecht-root utrecht-document'>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="${basePath}/public/vendor/preview-style.css" />
    <link rel="stylesheet" href="https://unpkg.com/@utrecht/component-library-css@9.0.0/dist/index.css" />
    <link rel="stylesheet" href="https://unpkg.com/@utrecht/component-library-css@9.0.0/dist/html.css" />
    <link rel="stylesheet" href="https://unpkg.com/@utrecht/design-tokens@5.0.1/dist/index.css" />
</head>

<body class="utrecht-theme">
    <div id="root">${app}</div>
    <script>
      window.__VAC_PREVIEW_DATA__ = ${JSON.stringify(vacData)};
      window.__KENNISARTIKEL_PREVIEW_DATA__ = ${JSON.stringify(kennisartikelData)};
       ${status !== undefined ? `window.__STATUS__ = '${status}';` : 'window.__STATUS__ = undefined;'}
      window.__ERROR_PAGE_DATA__ = ${JSON.stringify(errorPageData)};
    </script>
    <script type="module" src="${basePath}/public/vendor/client.js"></script>
</body>
</html>
`;
