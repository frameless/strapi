import { cookies } from 'next/headers';
import { Heading, Markdown } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { getImageBaseUrl } from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { useTranslation } from '../i18n';
import { fallbackLng } from '../i18n/settings';

const NotFoundPage = async () => {
  const locale = cookies().get('i18next')?.value;
  const { t } = await useTranslation(locale || fallbackLng, ['common']);
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
      <Heading level={1}>{data?.notFoundPage?.data?.attributes?.title}</Heading>
      <Markdown imageUrl={getImageBaseUrl()}>{data?.notFoundPage?.data?.attributes?.body}</Markdown>
    </div>
  );
};

export default NotFoundPage;
