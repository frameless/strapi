import { generateSurveyURL, getSurveyParams } from './generateSurveyURL';
import { getURL } from './getURL';
import { setEnv } from './setEnv';

const env = {
  SURVEY_RUN_GUID: '60A72278-5CCD-4DD2-8872-4FEDD81B7C77',
  SURVEY_RUN_APIKEY: '9C731E4C-C692-4C23-AD69-6A1A10D9F3C3',
  FRONTEND_PUBLIC_URL: 'http://localhost:3000',
  SURVEY_RUN_URL: 'https://example.com',
};
const surveyParams = {
  ...getSurveyParams({
    SURVEY_RUN_GUID: env.SURVEY_RUN_GUID,
    SURVEY_RUN_APIKEY: env.SURVEY_RUN_APIKEY,
    FRONTEND_PUBLIC_URL: getURL({ env, key: 'FRONTEND_PUBLIC_URL', isOrigin: true }) as string,
    SURVEY_RUN_URL: getURL({ env, key: 'SURVEY_RUN_URL' }) as URL,
  }),
  segment: '/survey/1',
};

describe('generateSurveyURL', () => {
  const originalEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('should generate a valid survey URL with all required parameters', () => {
    const surveyURL = generateSurveyURL(surveyParams);
    const url = new URL(surveyURL as string);
    expect(surveyURL).toBeTruthy();
    expect(surveyURL).toContain(surveyParams.guid);
    expect(surveyURL).toContain(surveyParams.apikey);
    expect(url.searchParams.get('webpagina')?.includes(surveyParams?.frontendPublicURL as string)).toBeTruthy();
    expect(url.searchParams.get('webpagina')?.includes(surveyParams.segment)).toBeTruthy();
    expect(surveyURL).toContain('standard');
    expect(surveyURL).toContain('false');
    expect(surveyURL).toContain('nl');
    expect(surveyURL).toContain(surveyParams?.surveyURL?.origin);
  });
  it('should handle invalid URL parameters', () => {
    const missingParams = { ...surveyParams, frontendPublicURL: 'invalid-url' };
    const surveyURL = generateSurveyURL(missingParams);
    expect(surveyURL).toBeFalsy();
  });
  it('should return null when guid is missing on production mode', () => {
    setEnv('NODE_ENV', 'production');
    const missingParams = { ...surveyParams, guid: undefined };
    const surveyURL = generateSurveyURL(missingParams);
    expect(surveyURL).toBeNull();
  });
  it('should return null when apikey is missing on production mode', () => {
    setEnv('NODE_ENV', 'production');
    const missingParams = { ...surveyParams, apikey: undefined };
    const surveyURL = generateSurveyURL(missingParams);
    expect(surveyURL).toBeNull();
  });
  it('should return null when segment is missing on production mode', () => {
    setEnv('NODE_ENV', 'production');
    const missingParams = { ...surveyParams, segment: undefined };
    const surveyURL = generateSurveyURL(missingParams);
    expect(surveyURL).toBeNull();
  });
  it('should return null when frontendPublicURL is missing on production mode', () => {
    setEnv('NODE_ENV', 'production');
    const missingParams = { ...surveyParams, frontendPublicURL: undefined };
    const surveyURL = generateSurveyURL(missingParams);
    expect(surveyURL).toBeNull();
  });
  it('should return null when surveyURL is missing on production mode', () => {
    setEnv('NODE_ENV', 'production');
    const missingParams = { ...surveyParams, surveyURL: undefined };
    const surveyURL = generateSurveyURL(missingParams);
    expect(surveyURL).toBeNull();
  });
  it('should throw an error when guid is missing on development, test, or debug mode', () => {
    setEnv('NODE_ENV', 'development');
    const missingParams = { ...surveyParams, guid: undefined };
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('NODE_ENV', 'test');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('DEBUG', 'true');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
  });
  it('should throw an error when apikey is missing on development, test, or debug mode', () => {
    setEnv('NODE_ENV', 'development');
    const missingParams = { ...surveyParams, apikey: undefined };
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('NODE_ENV', 'test');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('DEBUG', 'true');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
  });
  it('should throw an error when segment is missing on development, test, or debug mode', () => {
    setEnv('NODE_ENV', 'development');
    const missingParams = { ...surveyParams, segment: undefined };
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('NODE_ENV', 'test');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('DEBUG', 'true');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
  });
  it('should throw an error when frontendPublicURL is missing on development, test, or debug mode', () => {
    setEnv('NODE_ENV', 'development');
    const missingParams = { ...surveyParams, frontendPublicURL: undefined };
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('NODE_ENV', 'test');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('DEBUG', 'true');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
  });
  it('should throw an error when surveyURL is missing on development, test, or debug mode', () => {
    setEnv('NODE_ENV', 'development');
    const missingParams = { ...surveyParams, surveyURL: undefined };
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('NODE_ENV', 'test');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
    setEnv('DEBUG', 'true');
    expect(() => generateSurveyURL(missingParams)).toThrow(
      'Warning: One of the survey params (guid, apikey, segment, surveyURL, frontendPublicURL) is not provided. Please provide all the required params to generate the survey URL.',
    );
  });
});
