import { buildURL } from '@frameless/utils';

export const getFloLegalURLs = (): { floLegalCdnURL: string | undefined; floLegalFormApiURL: string | undefined } => {
  try {
    const floLegalFormApiURL = buildURL({
      env: process.env,
      key: 'FLO_LEGAL_API_URL',
      isOrigin: false,
    }).href;
    const floLegalCdnURL = buildURL({
      env: process.env,
      key: 'FLO_LEGAL_CDN_URL',
      segments: ['flo-client-plugin.1.9.0.js'],
    }).href;
    return { floLegalCdnURL, floLegalFormApiURL };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Error in getFloLegalURLs: Failed to build URLs. Details: ${error instanceof Error ? error.message : error}`,
    );
    return { floLegalCdnURL: undefined, floLegalFormApiURL: undefined };
  }
};
