import { cookies } from 'next/headers';

import { GetNotFoundPageQuery } from '../../../../gql/graphql';
import { useTranslation } from '../../i18n';
import { fallbackLng } from '../../i18n/settings';

import { Heading, Markdown } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { fetchData, getImageBaseUrl, getStrapiGraphqlURL } from '@/util';

const NotFoundPage = async () => {
  new Response(null, { status: 404 });
  const locale = (await cookies()).get('i18next')?.value;
  const { t } = await useTranslation(locale || fallbackLng, ['common']);
  const { data } = await fetchData<{ data: GetNotFoundPageQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_NOT_FOUND_PAGE,
    variables: { locale: locale },
  });

  return (
    <div>
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
        ]}
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.online-loket'),
          current: false,
        }}
      />
      <main id="main">
        <Heading level={1}>{data?.notFoundPage?.title}</Heading>
        {data?.notFoundPage?.body && <Markdown imageUrl={getImageBaseUrl()}>{data.notFoundPage.body}</Markdown>}
      </main>
    </div>
  );
};

export default NotFoundPage;
