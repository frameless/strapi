import { draftMode, headers } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { AdvancedLink, Breadcrumbs, Grid, GridCell, ScrollToTopButton, UtrechtIconChevronUp } from '@/components';
import { OpenFormsEmbed } from '@/components/OpenFormsEmbed/OpenFormsEmbed';
import { GET_FROM_BY_SLUG } from '@/query';
import { createStrapiURL, fetchData } from '@/util';
import { createOpenFormsApiUrl, createOpenFormsCssUrl, createOpenFormsSdkUrl } from '@/util/openFormsSettings';
import { GetFormSlugsQuery } from '../../../../../../gql/graphql';

type FormPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

const FormPage = async ({ params: { locale, slug } }: FormPageProps) => {
  const { t } = await useTranslation(locale, 'common');
  const nonce = headers().get('x-nonce') || '';
  const { isEnabled } = draftMode();
  const getFormBySlug = async () => {
    const { data } = await fetchData<{ data: GetFormSlugsQuery }>({
      url: createStrapiURL(),
      query: GET_FROM_BY_SLUG,
      variables: {
        slug,
        locale,
        pageMode: isEnabled ? 'PREVIEW' : 'LIVE',
      },
    });

    if (!data || data?.forms?.data?.length === 0) notFound();

    return {
      form: data?.forms?.data[0],
    };
  };
  const { form } = await getFormBySlug();

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
        basePath={`/${locale}/form/${isEnabled ? form?.attributes?.slug : slug}/`}
        slug={isEnabled ? String(form?.attributes?.slug) : slug}
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
