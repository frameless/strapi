import { useTranslation } from '@/app/i18n';
import { PageTitle } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { Markdown } from '@/components/Markdown';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const NotFoundPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t } = await useTranslation(locale, ['common']);
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_NOT_FOUND_PAGE,
    variables: { locale: locale },
  });

  return (
    <div>
      <Breadcrumbs
        links={[
          {
            href: 'https://www.utrecht.nl/',
            label: t('components.breadcrumbs.label.home'),
            current: true,
          },
        ]}
      />
      <PageTitle>{data?.notFoundPage?.data?.attributes?.title}</PageTitle>
      <Markdown strapiBackendURL={process.env.STRAPI_PUBLIC_URL}>{data?.notFoundPage?.data?.attributes?.body}</Markdown>
    </div>
  );
};

export default NotFoundPage;
