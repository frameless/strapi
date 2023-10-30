import { Metadata } from 'next';
import { useTranslation } from '@/app/i18n';
import { Heading, PageTitle, UnorderedList, UnorderedListItem } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumb';

type Params = {
  params: {
    locale: string;
    query: string;
  };
};

export async function generateMetadata({ params: { locale, query } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['tips-page']);
  return {
    title: t('seo.title', {
      query,
    }),
    description: t('seo.description'),
  };
}

const SearchTips = async ({ params: { locale, query } }: any) => {
  const { t } = await useTranslation(locale, ['tips-page', 'common']);
  const tipsList = t('body.section.unordered-list', { returnObjects: true }) as string[];
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
            href: `/search/tips/${query}`,
            label: t('components.breadcrumbs.label.search-tips'),
            current: true,
          },
        ]}
      />
      <PageTitle>
        {t('h1', {
          query,
        })}
      </PageTitle>
      <Heading level={2}>{t('body.section.title')}</Heading>
      <UnorderedList>
        {tipsList &&
          tipsList.length > 0 &&
          tipsList?.map((item) => <UnorderedListItem key={item}>{item}</UnorderedListItem>)}
      </UnorderedList>
    </>
  );
};

export default SearchTips;
