import { Metadata } from 'next';
import {
  ButtonLink,
  Heading1,
  Heading2,
  UtrechtDigidLogo,
  UtrechtEherkenningLogo,
  UtrechtIconArrow,
  UtrechtLogoButton,
} from '@/components';
import { BottomBar, BottomBarItem } from '@/components/BottomBar';
import { ProductNavigation } from '@/components/ProductNavigation';
import { alphabet } from '@/components/ProductNavigation/alphabet';
import { ReactionLink } from '@/components/ReactionLink';
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
      <Heading1>{t('h1')}</Heading1>
      {/* TODO: Create a responsive layout component*/}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', boxSizing: 'border-box' }}>
        <div style={{ width: '71%' }}>
          <section>
            <TopTask data={toptask} />
          </section>
          <section>
            <Heading2>{t('components.alphabetically-products-navigation')}</Heading2>
            <ProductNavigation alphabet={alphabetAvailability} component="link" pathname="products/alphabet" />
          </section>
        </div>
        <div style={{ width: '28%' }}>
          <section>
            <Heading2>MIJN LOKET</Heading2>
            <p>
              <UtrechtLogoButton>
                <UtrechtDigidLogo />
                <ButtonLink
                  appearance="primary-action-button"
                  href="https://pki.utrecht.nl/Loket/login/initLoginAction.do?forward=%2Flogin%2FloginForwardDAction.do&failedForward=%2Flogin%2FloginForwardFailedDAction.do&ltype=1"
                  aria-label="Inloggen DigiD"
                >
                  Inloggen DigiD <UtrechtIconArrow />
                </ButtonLink>
              </UtrechtLogoButton>
            </p>
            <p>
              <UtrechtLogoButton>
                <UtrechtEherkenningLogo />
                <ButtonLink
                  appearance="primary-action-button"
                  href="https://pki.utrecht.nl/Loket/login/initLoginAction.do?forward=%2Flogin%2FloginForwardEAction.do&failedForward=%2Flogin%2FloginForwardFailedEAction.do&ltype=2"
                  aria-label="Inloggen eHerkenning"
                  className="utrecht-button-link--eherkenning"
                >
                  Inloggen eHerkenning
                  <UtrechtIconArrow />
                </ButtonLink>
              </UtrechtLogoButton>
            </p>
          </section>
        </div>
      </div>
      <BottomBar>
        <BottomBarItem>
          <ReactionLink href="https://www.kcmsurvey.com/qSwudd733b9c27c2e91ba8c7b598MaSd?webpagina=Alle%20producten">
            {t('actions.reaction-link')}
          </ReactionLink>
        </BottomBarItem>
        <BottomBarItem>
          <ScrollToTopButton>{t('actions.scroll-to-top')}</ScrollToTopButton>
        </BottomBarItem>
      </BottomBar>
    </>
  );
};

export default Home;
