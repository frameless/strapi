'use server';

import { redirect } from 'next/navigation';
import { ErrorHandler } from './fetchData';
import { createOpenFormsApiUrl } from './openFormsSettings';

type OpenFormValidatorFunction = {
  formId: string;
};

interface BasicFormInfo {
  uuid: string;
  name: string;
}

export const openFormValidator = async ({ formId }: OpenFormValidatorFunction): Promise<BasicFormInfo | null> => {
  if (!formId || !process.env.OPEN_FORMS_API_TOKEN) return null;
  const { origin, pathname } = createOpenFormsApiUrl() as URL;
  const openFormsURL = `${origin}${pathname.endsWith('/') ? pathname : `${pathname}/`}forms/${formId}`;

  const res = await fetch(openFormsURL, {
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
    redirect('/form/error/form-server-down');
  });

  if (res.status === 200) {
    const json = await res.json();

    return {
      uuid: json.uuid,
      name: json.name,
    };
  }
  if (res.status === 404) {
    redirect('/form/error/form-not-found');
  } else if (res.status === 401) {
    throw new ErrorHandler('Unauthorized', {
      statusCode: 401,
    });
  } else if (res.status === 403) {
    throw new ErrorHandler('Forbidden', {
      statusCode: 403,
    });
  } else if (res.status >= 500) {
    redirect('/form/error/form-server-down');
  }
  return null;
};
