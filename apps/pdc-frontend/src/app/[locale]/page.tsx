import { Metadata } from 'next';
import { AdvancedLink, Grid, GridCell, Heading2, PageTitle } from '@/components';
import { BottomBar, BottomBarItem } from '@/components/BottomBar';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { ProductNavigation } from '@/components/ProductNavigation';
import { alphabet } from '@/components/ProductNavigation/alphabet';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { TopTask, TopTaskIconsTypes } from '@/components/Toptask';
import { CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { useTranslation } from '../i18n';

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
  const { t } = await useTranslation(locale, 'home-page');
  return {
    title: t('seo.title'),
    description: t('seo.description'),
  };
}

const Home = async ({ params: { locale } }: { params: any }) => {
  const { t } = await useTranslation(locale, ['home-page', 'common']);

  const productsAvailability = alphabet.map(async (letter) => {
    const { data } = await fetchData({
      url: createStrapiURL(),
      query: CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY,
      variables: { locale, startsWith: letter },
    });
    return { letter, availability: data.products.data.length > 0 ? true : false };
  });

  const alphabetAvailability = await Promise.all(productsAvailability);

  const toptask = [
    {
      id: '1',
      title: t('toptask.items.0.title'),
      icon: 'paspoort' as TopTaskIconsTypes,
      href: 'https://www.utrecht.nl/paspoort',
    },
    {
      id: '2',
      title: t('toptask.items.1.title'),
      icon: 'melding' as TopTaskIconsTypes,
      href: 'https://www.utrecht.nl/melding',
    },
    {
      id: '3',
      title: t('toptask.items.2.title'),
      icon: 'verhuizen' as TopTaskIconsTypes,
      href: 'https://www.utrecht.nl/verhuizen',
    },
    {
      id: '4',
      title: t('toptask.items.3.title'),
      icon: 'parkeren_betalen' as TopTaskIconsTypes,
      href: 'https://www.utrecht.nl/kentekenwijziging',
    },
    {
      id: '5',
      title: t('toptask.items.4.title'),
      icon: 'rijbewijs' as TopTaskIconsTypes,
      href: 'https://www.utrecht.nl/rijbewijs',
    },
    {
      id: '6',
      title: t('toptask.items.5.title'),
      icon: 'grofvuil' as TopTaskIconsTypes,
      href: 'https://www.utrecht.nl/grofvuil',
    },
  ];

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
            current: true,
          },
        ]}
      />
      <PageTitle>{t('h1')}</PageTitle>
      <Grid>
        <>
          <GridCell md={10} lg={9}>
            <section>
              <TopTask data={toptask} />
            </section>
          </GridCell>
          <GridCell md={10} lg={9}>
            <section>
              <Heading2>{t('components.alphabetically-products-navigation')}</Heading2>
              <ProductNavigation alphabet={alphabetAvailability} component="link" pathname="products/alphabet" />
            </section>
          </GridCell>
        </>
      </Grid>
      <BottomBar>
        <BottomBarItem>
          <AdvancedLink
            rel="noopener noreferrer"
            external
            icon="arrow"
            color="red"
            href="https://www.kcmsurvey.com/qSwudd733b9c27c2e91ba8c7b598MaSd?webpagina=Alle%20producten"
          >
            {t('actions.reaction-link')}
          </AdvancedLink>
        </BottomBarItem>
        <BottomBarItem>
          <ScrollToTopButton>{t('actions.scroll-to-top')}</ScrollToTopButton>
        </BottomBarItem>
      </BottomBar>
    </>
  );
};

export default Home;
