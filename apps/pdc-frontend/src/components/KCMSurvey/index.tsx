import { buildURL } from '@frameless/utils';
import Script from 'next/script';
import React from 'react';
import './index.scss';
interface KCMSurveyProps {
  nonce: string;
}

/**
 * KCMSurvey embeds the KCM survey widget into the page.
 *
 * @param {KCMSurveyProps} props - The props for the survey component.
 * @param {string} [props.nonce] - The nonce for the script tag for CSP compliance.
 * @returns {JSX.Element | null} The KCM survey widget and required script, or null if required env vars are missing.
 */
export const KCMSurvey = ({ nonce }: KCMSurveyProps) => {
  try {
    const kcmSurveyURL = buildURL({
      env: process.env,
      key: 'KCM_SURVEY_URL',
      // the current API behaver is when you don't provide a version it pulls the latest version
      segments: ['surveyembedding', process.env.KCM_SURVEY_VERSION ?? '', 'kcm-survey.js'].filter(Boolean),
    });
    const kcmSurveyStylesheetLink = buildURL({
      env: process.env,
      key: 'KCM_SURVEY_STYLESHEETS_LINK',
      segments: ['fileadmin', 'kcm-radio.css'],
    });

    if (
      !process.env.KCM_SURVEY_URL ||
      !process.env.KCM_SURVEY_ID ||
      !process.env.KCM_SURVEY_API_KEY ||
      !process.env.KCM_SURVEY_VERSION
    ) {
      return null;
    }

    return (
      <>
        {/* 
        crossOrigin="anonymous" is required to securely load the external KCM survey script 
        and to ensure proper handling of CORS and CSP policies.
      */}
        <Script
          strategy="afterInteractive"
          id="kcm-survey-script"
          crossOrigin="anonymous"
          src={kcmSurveyURL.href}
          nonce={nonce}
        />
        {React.createElement('kcm-survey', {
          id: process.env.KCM_SURVEY_ID,
          'api-key': process.env.KCM_SURVEY_API_KEY,
          stylesheetlink: kcmSurveyStylesheetLink?.href,
          className: 'utrecht-kcm-survey',
        })}
      </>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in KCMSurvey component:', error);
    return null;
  }
};
