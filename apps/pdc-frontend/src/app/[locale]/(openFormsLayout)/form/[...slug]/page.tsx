import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { AdvancedLink, Breadcrumbs, Grid, GridCell, ScrollToTopButton, UtrechtIconChevronUp } from '@/components';
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
  await openFormValidator({ formId });

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
      <OpenFormsEmbed
        apiUrl={createOpenFormsApiUrl()?.href || ''}
        sdkUrl={createOpenFormsSdkUrl()?.href || ''}
        cssUrl={createOpenFormsCssUrl()?.href || ''}
        nonce={nonce}
        basePath={`/${locale}/form/${formId}/`}
        slug={formId}
      />
      <Grid justifyContent="space-between" spacing="sm">
        <GridCell sm={8}>
          <AdvancedLink
            rel="noopener noreferrer"
            external
            icon="arrow"
            color="red"
            href="https://www.kcmsurvey.com/qSwudd733b9c27c2e91ba8c7b598MaSd?webpagina=Alle%20producten"
          >
            {t('actions.reaction-link')}
          </AdvancedLink>
        </GridCell>
        <GridCell sm={4} justifyContent="flex-end">
          <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
        </GridCell>
      </Grid>
    </>
  );
};

export default FormPage;
