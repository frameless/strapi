import { cookies } from 'next/headers';
import Link from 'next/link';
import { Heading, Markdown } from '@/components';
import { Breadcrumbs } from '@/components';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { getImageBaseUrl } from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GetNotFoundPageQuery } from '../../../../gql/graphql';
import { useTranslation } from '../../i18n';
import { fallbackLng } from '../../i18n/settings';

const NotFoundPage = async () => {
  new Response(null, { status: 404 });
  const locale = cookies().get('i18next')?.value;
  const { t } = await useTranslation(locale || fallbackLng, ['common']);
  const { data } = await fetchData<{ data: GetNotFoundPageQuery }>({
    url: createStrapiURL(),
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
        Link={Link}
      />
      <main id="main">
        <Heading level={1}>{data?.notFoundPage?.data?.attributes?.title}</Heading>
        {data?.notFoundPage?.data?.attributes?.body && (
          <Markdown imageUrl={getImageBaseUrl()}>{data.notFoundPage.data.attributes.body}</Markdown>
        )}
      </main>
    </div>
  );
};

export default NotFoundPage;
