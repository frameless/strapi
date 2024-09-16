'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { useTranslation } from '@/app/i18n';
import { buildURL, getPathAndSearchParams } from './buildURL';
import { ErrorHandler } from './fetchData';

type OpenFormValidatorFunction = {
  formId: string;
};

interface BasicFormInfo {
  uuid: string;
  name: string;
}

export const openFormValidator = async ({ formId }: OpenFormValidatorFunction): Promise<BasicFormInfo | null> => {
  if (!formId || !process.env.OPEN_FORMS_API_TOKEN) return null;

  const openFormsURL = buildURL({
    env: process.env,
    key: 'OPEN_FORMS_API_URL',
    segments: ['forms', formId],
    isOrigin: false,
  });

  const locale = cookies().get('i18nextLng')?.value || 'nl';

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);
  const { pathSegments: formServerDownSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.form', 'segments.error', 'segments.form-server-down'],
  });
  const { pathSegments: formNotFoundSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.form', 'segments.error', 'segments.form-not-found'],
  });

  const res = await fetch(openFormsURL.href, {
    mode: 'cors',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${process.env.OPEN_FORMS_API_TOKEN}`,
    },
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    redirect(`/${formServerDownSegment}`);
  });

  if (res.status === 200) {
    const json = await res.json();

    return {
      uuid: json.uuid,
      name: json.name,
    };
  }
  if (res.status === 404) {
    redirect(`/${formNotFoundSegment}`);
  } else if (res.status === 401) {
    throw new ErrorHandler('Unauthorized', {
      statusCode: 401,
    });
  } else if (res.status === 403) {
    throw new ErrorHandler('Forbidden', {
      statusCode: 403,
    });
  } else if (res.status >= 500) {
    redirect(`/${formServerDownSegment}`);
  }
  return null;
};
