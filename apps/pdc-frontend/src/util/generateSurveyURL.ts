import { getURL, showErrorBasedOnENV } from '@frameless/utils';
export interface SurveyRunParams {
  guid?: string;
  view?: string;
  apikey?: string;
  istestresult?: string;
  locale?: string;
  segment?: string;
  frontendPublicURL?: string;
  surveyURL?: URL;
}

export const getSurveyParams = (env: any): SurveyRunParams => {
  return {
    guid: env.SURVEY_RUN_GUID,
    view: 'standard',
    apikey: env.SURVEY_RUN_APIKEY,
    istestresult: 'false',
    locale: 'nl',
    frontendPublicURL: getURL({ env, key: 'FRONTEND_PUBLIC_URL', isOrigin: true }) as string,
    surveyURL: getURL({ env, key: 'SURVEY_RUN_URL' }) as URL,
  };
};

export const generateSurveyURL = ({
  apikey,
  guid,
  istestresult,
  locale,
  view,
  segment,
  frontendPublicURL,
  surveyURL,
}: SurveyRunParams) => {
  if (!guid || !apikey || !segment || !frontendPublicURL || !surveyURL) {
    showErrorBasedOnENV(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    return null;
  }
  try {
    const webpagina = new URL(segment, frontendPublicURL);
    const params = new URLSearchParams({
      guid,
      apikey,
      webpagina: webpagina.toString(),
    });
    if (view) params.set('view', view);
    if (istestresult) params.set('istestresult', istestresult);
    if (locale) params.set('locale', locale);
    surveyURL.search = params.toString();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating survey URL:', error);
    return null;
  }
  return surveyURL.toString();
};
