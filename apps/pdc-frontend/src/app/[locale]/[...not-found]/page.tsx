import { useTranslation } from '@/app/i18n';
import { Heading, Markdown } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { getImageBaseUrl } from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const NotFoundPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t } = await useTranslation(locale, ['common']);
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_NOT_FOUND_PAGE,
    variables: { locale },
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
      <Heading level={1}>{data?.notFoundPage?.data?.attributes?.title}</Heading>
      <Markdown imageUrl={getImageBaseUrl()} locale={locale}>
        {data?.notFoundPage?.data?.attributes?.body}
      </Markdown>
    </div>
  );
};

export default NotFoundPage;
