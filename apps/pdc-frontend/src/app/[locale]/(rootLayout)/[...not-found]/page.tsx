import Link from 'next/link';
import { useTranslation } from '@/app/i18n';
import { Breadcrumbs, Heading, Markdown } from '@/components';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { getImageBaseUrl, getStrapiGraphqlURL } from '@/util';
import { fetchData } from '@/util/fetchData';
import { GetNotFoundPageQuery } from '../../../../../gql/graphql';

const NotFoundPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  new Response(null, { status: 404 });
  const { t } = await useTranslation(locale, ['common']);
  const { data } = await fetchData<{ data: GetNotFoundPageQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_NOT_FOUND_PAGE,
    variables: { locale },
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
            current: true,
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
          <Markdown imageUrl={getImageBaseUrl()} locale={locale}>
            {data.notFoundPage.data.attributes.body}
          </Markdown>
        )}
      </main>
    </div>
  );
};

export default NotFoundPage;
