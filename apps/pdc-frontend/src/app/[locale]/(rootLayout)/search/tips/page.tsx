import { Metadata } from 'next';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n';
import { Breadcrumbs, Heading, UnorderedList, UnorderedListItem } from '@/components';
import { getPathAndSearchParams } from '@/util';

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
      query: decodeURIComponent(query),
      interpolation: { escapeValue: false },
    }),
    description: t('seo.description'),
  };
}

const SearchTips = async ({ params: { locale }, searchParams }: any) => {
  const { t } = await useTranslation(locale, ['tips-page', 'common']);
  const query = searchParams?.query;
  const tipsList = t('body.section.unordered-list', { returnObjects: true }) as string[];
  const decodeQuery = decodeURIComponent(query);

  const { fullURL: tipsSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.search', 'tips'],
    queryParams: { query: decodeQuery },
    locale,
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
          {
            href: `/${tipsSegment}`,
            label: t('components.breadcrumbs.label.search-tips'),
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
        <Heading level={1}>
          {t('h1', {
            query: decodeQuery,
            interpolation: { escapeValue: false },
          })}
        </Heading>
        <Heading level={2}>{t('body.section.title')}</Heading>
        <UnorderedList>
          {tipsList &&
            tipsList.length > 0 &&
            tipsList?.map((item) => <UnorderedListItem key={item}>{item}</UnorderedListItem>)}
        </UnorderedList>
      </main>
    </div>
  );
};

export default SearchTips;
