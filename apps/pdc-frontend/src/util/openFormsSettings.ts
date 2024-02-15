export const createOpenFormsApiUrl = () => {
  if (!process.env.OPEN_FORMS_API_URL) {
    return null;
  }

  return new URL(process.env.OPEN_FORMS_API_URL);
};

export const createOpenFormsSdkUrl = () => {
  if (!process.env.OPEN_FORMS_SDK_URL) {
    return null;
  }

  return new URL(process.env.OPEN_FORMS_SDK_URL);
};
export const createOpenFormsCssUrl = () => {
  if (!process.env.OPEN_FORMS_CSS_URL) {
    return null;
  }

  return new URL(process.env.OPEN_FORMS_CSS_URL);
};
