export const isOpenFormsMockEnabled = (): boolean => process.env.OPEN_FORMS_MOCK === 'true';

export const createOpenFormsApiUrl = () => {
  if (!process.env.OPEN_FORMS_API_URL) {
    return null;
  }

  return new URL(process.env.OPEN_FORMS_API_URL);
};

/**
 * URL the *browser-side* SDK should use for API calls.
 *
 * The SDK calls the Open Forms backend directly from the browser. CORS is
 * configured on the backend (CORS_ALLOW_ALL_ORIGINS=True + CORS_ALLOW_CREDENTIALS=True),
 * so cross-origin requests with credentials work correctly.
 */
export const createOpenFormsClientApiUrl = () => {
  if (isOpenFormsMockEnabled()) return '/api/open-forms-mock/';
  if (!process.env.OPEN_FORMS_API_URL) return null;
  return process.env.OPEN_FORMS_API_URL;
};

export const createOpenFormsSdkUrl = () => {
  if (!process.env.OPEN_FORMS_SDK_URL) {
    const apiOrigin = createOpenFormsApiUrl()?.origin;

    if (apiOrigin) {
      return new URL(`${apiOrigin}/static/sdk/bundles/open-forms-sdk.mjs`);
    }

    return null;
  }

  return new URL(process.env.OPEN_FORMS_SDK_URL);
};

export const createOpenFormsCssUrl = () => {
  if (!process.env.OPEN_FORMS_CSS_URL) {
    const apiOrigin = createOpenFormsApiUrl()?.origin;

    if (apiOrigin) {
      return new URL(`${apiOrigin}/static/sdk/open-forms-sdk.css`);
    }

    return null;
  }

  return new URL(process.env.OPEN_FORMS_CSS_URL);
};

/**
 * Same-origin URLs for the SDK bundle and CSS, routed through the Next.js static proxy.
 *
 * These intentionally ignore OPEN_FORMS_SDK_URL / OPEN_FORMS_CSS_URL. Any
 * cross-origin module URL causes Turbopack's polyfill-module.js to resolve
 * relative fetch() calls against the module's origin instead of the document
 * origin, breaking all API calls from within the SDK. The proxy always serves
 * the files from the same origin as the page, regardless of where the backend
 * actually lives.
 */
export const createOpenFormsSdkClientUrl = (): string | null => {
  if (!process.env.OPEN_FORMS_API_URL) return null;
  return '/open-forms-static/sdk/bundles/open-forms-sdk.mjs';
};

export const createOpenFormsCssClientUrl = (): string | null => {
  if (!process.env.OPEN_FORMS_API_URL) return null;
  return '/open-forms-static/sdk/open-forms-sdk.css';
};
