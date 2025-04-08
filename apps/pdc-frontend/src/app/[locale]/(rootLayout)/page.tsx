import { buildURL, getPathAndSearchParams } from '@frameless/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Breadcrumbs,
  Grid,
  GridCell,
  Heading,
  Heading2,
  IndexCharNav,
  IndexCharNavLink,
  ScrollToTopButton,
  UtrechtIconChevronUp,
} from '@/components';
import { SurveyLink } from '@/components/SurveyLink';
import { TopTask, TopTaskDataTypes } from '@/components/Toptask';
import { CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY, GET_PDC_HOME_PAGE } from '@/query';
import { alphabet, getStrapiGraphqlURL } from '@/util';
import { fetchData } from '@/util/fetchData';
import {
  CheckAlphabeticallyProductsAvailabilityQuery,
  ComponentComponentsUtrechtTopTasks,
  GetPdcHomePageQuery,
} from '../../../../gql/graphql';
import { useTranslation } from '../../i18n';

export interface Fields {
  title: string;
  body: string;
}

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['home-page', 'common']);
  const title = t('seo.title');
  const description = t('seo.description');
  const url = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    locale,
  });

  return {
    title: `${title} | ${t('website-setting.website-name')}`,
    description,
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')} `,
      description,
      locale,
      url: url?.href,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
  };
}

const Home = async ({ params: { locale } }: { params: any }) => {
  const { t } = await useTranslation(locale, ['home-page', 'common']);
  const { data } = await fetchData<{ data: GetPdcHomePageQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_PDC_HOME_PAGE,
    variables: { locale },
  });

  const topTasksData = data.pdcHomePage?.data?.attributes?.components?.find(
    (component) => component?.__typename === 'ComponentComponentsUtrechtTopTasks',
  ) as ComponentComponentsUtrechtTopTasks;

  const productsAvailability = alphabet.map(async (letter) => {
    const { data } = await fetchData<{ data: CheckAlphabeticallyProductsAvailabilityQuery }>({
      url: getStrapiGraphqlURL(),
      query: CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY,
      variables: { locale, startsWith: letter },
    });

    const isAvailable = data.products?.data && data.products?.data.length > 0;
    const { pathSegments } = getPathAndSearchParams({
      translations: t,
      segments: ['segments.products', 'segments.alphabet', letter.toLocaleLowerCase()],
      locale,
    });

    return {
      char: letter,
      disabled: !isAvailable,
      href: !isAvailable ? undefined : pathSegments,
    };
  });

  const alphabetAvailability = await Promise.all(productsAvailability);

  return (
    <>
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
            href: '/',
            label: t('components.breadcrumbs.label.online-loket'),
            current: true,
          },
        ]}
        backLink={{
          href: 'https://www.utrecht.nl/',
          label: t('components.breadcrumbs.label.home'),
          current: false,
        }}
        Link={Link}
      />
      <main id="main">
        <Heading level={1}>{t('h1')}</Heading>
        <Grid>
          <>
            <GridCell md={10} lg={9}>
              <section>
                <TopTask data={topTasksData?.link as TopTaskDataTypes[]} />
              </section>
            </GridCell>
            <GridCell md={10} lg={9}>
              <section>
                <Heading2>{t('components.alphabetically-products-navigation')}</Heading2>
                <IndexCharNav characters={alphabetAvailability} component="link" Link={IndexCharNavLink} />
              </section>
            </GridCell>
          </>
        </Grid>
        <Grid justifyContent="space-between" spacing="sm">
          <GridCell sm={8}>
            <SurveyLink segment={locale} t={t} env={process.env} />
          </GridCell>
          <GridCell sm={4} justifyContent="flex-end">
            <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
        </Grid>
      </main>
    </>
  );
};

export default Home;
