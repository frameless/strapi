const CONTENT_TYPE_MAP: Record<string, { path: string; slugField?: string }> = {
  'api::homepage.homepage': {
    path: 'Homepage',
    // Homepage has no slug field
  },
  'api::navigation-page.navigation-page': {
    path: 'Hoofditem',
    slugField: 'slug',
  },
  'api::article-page.article-page': {
    path: 'ThemaContent',
    slugField: 'slug',
  },
  'api::theme-page.theme-page': {
    path: 'Thema',
    slugField: 'slug',
  },
};

export default ({ env }) => ({
  watchIgnoredFiles: ['**/config/sync/**'],
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: false, // disable the Net Promoter Score popup
    promoteEE: false, // disable the promotion of Strapi Enterprise features
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env('FRONTEND_PUBLIC_URL'),
      async handler(uid, { documentId, locale, status }) {
        const config = CONTENT_TYPE_MAP[uid];
        if (!config || !documentId) return null;

        const secret = env('PREVIEW_SECRET_TOKEN');
        if (!secret) return null;

        // Handle homepage separately (no slug field)
        if (!config.slugField) {
          const params = new URLSearchParams({
            secret,
            type: config.path,
            locale,
            status,
          });
          return `${env('FRONTEND_PUBLIC_URL')}/api/preview?${params}`;
        }

        const document = await strapi.documents(uid).findOne({
          documentId,
          fields: [config.slugField],
          status: status === 'published' ? 'published' : 'draft',
        });

        if (!document?.[config.slugField]) return null;

        const params = new URLSearchParams({
          secret,
          slug: document[config.slugField],
          type: config.path,
          locale,
          status,
        });

        return `${env('FRONTEND_PUBLIC_URL')}/api/preview?${params}`;
      },
    },
  },
});
