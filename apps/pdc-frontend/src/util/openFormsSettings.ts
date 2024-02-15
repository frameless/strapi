export const createOpenFormsApiUrl = () => {
  if (!process.env.OPEN_FORMS_API_URL) {
    return null;
  }

  return new URL(process.env.OPEN_FORMS_API_URL);
};

export const createOpenFormsSdkUrl = () => {
  if (!process.env.OPEN_FORMS_SDK_URL) {
    const apiOrigin = createOpenFormsApiUrl()?.origin;

    if (apiOrigin) {
      return new URL(`${apiOrigin}/static/sdk/open-forms-sdk.js`);
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
