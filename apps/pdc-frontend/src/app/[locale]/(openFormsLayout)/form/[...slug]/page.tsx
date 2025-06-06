import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { Breadcrumbs, Heading1 } from '@/components';
import { OpenFormsEmbed } from '@/components/OpenFormsEmbed/OpenFormsEmbed';
import { openFormValidator } from '@/util';
import { createOpenFormsApiUrl, createOpenFormsCssUrl, createOpenFormsSdkUrl } from '@/util/openFormsSettings';

type FormPageProps = {
  params: {
    locale: string;
    slug: [formId: string, formStep: string];
  };
};

const FormPage = async ({
  params: {
    locale,
    slug: [formId],
  },
}: FormPageProps) => {
  const { t } = await useTranslation(locale, 'common');
  const nonce = headers().get('x-nonce') || '';
  const formInfo = await openFormValidator({ formId });

  return (
    <>
      <Breadcrumbs
        label={
          t('components.breadcrumbs.ariaLabel', {
            defaultValue: 'Kruimelpad',
          }) as string
        }
        links={[
          {
            href: 'https://www.utrecht.nl/',
            label: t('components.breadcrumbs.label.home'),
            current: false,
          },
          {
            href: '/',
            label: t('components.breadcrumbs.label.online-loket'),
            current: false,
          },
        ]}
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.products'),
          current: false,
        }}
        Link={Link}
      />
      <main id="main">
        <div className="utrecht-form-container utrecht-form-container--openforms">
          <OpenFormsEmbed
            apiUrl={createOpenFormsApiUrl()?.href || ''}
            sdkUrl={createOpenFormsSdkUrl()?.href || ''}
            cssUrl={createOpenFormsCssUrl()?.href || ''}
            nonce={nonce}
            slug={formId}
            fallback={formInfo ? <Heading1>{formInfo.name}</Heading1> : null}
          />
        </div>
      </main>
    </>
  );
};

export default FormPage;
