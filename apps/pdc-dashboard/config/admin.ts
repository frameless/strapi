const CONTENT_TYPE_MAP: Record<string, { path: string; slugField: string }> = {
  'api::product.product': {
    path: 'products',
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
      allowedOrigins: [env('FRONTEND_PUBLIC_URL')], // Single string

      async handler(uid, { documentId, locale, status }) {
        const config = CONTENT_TYPE_MAP[uid];
        if (!config || !documentId) return null;

        const secret = env('PREVIEW_SECRET_TOKEN');
        if (!secret) {
          // eslint-disable-next-line no-console
          console.error('PREVIEW_SECRET_TOKEN is not defined');
          return null;
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
