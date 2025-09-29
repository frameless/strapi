import { buildURL } from '@frameless/utils';

export const getFloLegalURLs = (): { floLegalFormApiURL: string | undefined } => {
  try {
    const floLegalFormApiURL = buildURL({
      env: process.env,
      key: 'FLO_LEGAL_API_URL',
      isOrigin: false,
    }).href;

    return { floLegalFormApiURL };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Error in getFloLegalURLs: Failed to build URLs. Details: ${error instanceof Error ? error.message : error}`,
    );
    return { floLegalFormApiURL: undefined };
  }
};
