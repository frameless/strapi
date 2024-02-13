import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { Breadcrumbs } from '@/components';
import { OpenFormsEmbed } from '@/components/OpenFormsEmbed/OpenFormsEmbed';

type FormPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

const FormPage = async ({ params: { locale, slug } }: FormPageProps) => {
  const { t } = await useTranslation(locale, 'common');

  return (
    <>
      <Breadcrumbs
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
      <OpenFormsEmbed basePath={`/${locale}/form/${slug}/`} slug={slug} />
    </>
  );
};

export default FormPage;
