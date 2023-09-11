import { Metadata } from 'next';
import { cookies, draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { fallbackLng } from '@/app/i18n/settings';
import {
  AccordionProvider,
  Article,
  ButtonLink,
  Heading,
  Heading1,
  Paragraph,
  SpotlightSection,
  UtrechtDigidLogo,
  UtrechtEherkenningLogo,
  UtrechtEidasLogo,
  UtrechtIconArrow,
  UtrechtLogoButton,
} from '@/components';
import { BottomBar, BottomBarItem } from '@/components/BottomBar';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { FAQSection } from '@/components/FAQSection';
import { Markdown } from '@/components/Markdown';
import { PreviewAlert } from '@/components/PreviewAlert';
import { ReactionLink } from '@/components/ReactionLink';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { GET_PRODUCT_BY_SLUG_FETCH } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const getAllProducts = async (locale: string, slug: string) => {
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_PRODUCT_BY_SLUG_FETCH,
    variables: {
      slug: slug,
      locale: locale,
      pageMode: isEnabled ? 'PREVIEW' : 'LIVE',
    },
  });

  if (!data || data?.products?.data?.length === 0) {
    notFound();
  }

  return {
    product: data?.products?.data[0],
  };
};

const LogoButton = ({ logo, appearance, href, text, label }: any) => {
  switch (logo) {
    case 'digid':
      return (
        <p>
          <UtrechtLogoButton>
            <UtrechtDigidLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href} aria-label={label}>
              {text} <UtrechtIconArrow />
            </ButtonLink>
          </UtrechtLogoButton>
        </p>
      );
    case 'eherkenning':
      return (
        <p>
          <UtrechtLogoButton>
            <UtrechtEherkenningLogo />
            <ButtonLink
              appearance="primary-action-button"
              href={href}
              aria-label={label}
              className="utrecht-button-link--eherkenning"
            >
              {text} <UtrechtIconArrow />
            </ButtonLink>
          </UtrechtLogoButton>
        </p>
      );
    case 'eidas':
      return (
        <p>
          <UtrechtLogoButton>
            <UtrechtEidasLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href} aria-label={label}>
              {text} <UtrechtIconArrow />
            </ButtonLink>
          </UtrechtLogoButton>
        </p>
      );
    case 'without_logo':
      return (
        <p>
          <ButtonLink appearance={`${appearance}-action-button`} href={href} aria-label={label}>
            {text} <UtrechtIconArrow />
          </ButtonLink>
        </p>
      );
    default:
      return null;
  }
};

type ParamsType = {
  locale: string;
  slug: string;
};

interface ProductProps {
  params: ParamsType;
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({ slug, locale }: any): Promise<Metadata> {
  const { product } = await getAllProducts(locale, slug);
  return {
    title: product?.attributes.metaTags.title,
    description: product?.attributes?.metaTags?.description,
    other: {
      keymatch: product?.attributes?.metaTags?.keymatch,
    },
  };
}

const Product = async ({ params: { locale, slug }, searchParams }: ProductProps) => {
  const currentToken = cookies().has('secret') && cookies().get('secret')?.value;
  const isCurrentPreviewTokenValid = searchParams.secret === currentToken;
  const { isEnabled } = draftMode();
  if (!isCurrentPreviewTokenValid) {
    draftMode().disable();
  }
  const { product } = await getAllProducts(locale, slug);

  const priceData = product?.attributes.price && product?.attributes.price?.data?.attributes.price;
  const strapiImageURL = process.env.STRAPI_PUBLIC_URL;
  const { t } = await useTranslation(locale, 'common');
  const Sections = () =>
    product?.attributes && product?.attributes.sections.length > 0
      ? product?.attributes.sections.map((component: any, index: number) => {
          switch (component.__typename) {
            case 'ComponentComponentsBlockContent':
              return component.content ? (
                <Markdown strapiBackendURL={strapiImageURL} locale={locale} key={index} priceData={priceData}>
                  {component.content}
                </Markdown>
              ) : null;
            case 'ComponentComponentsLogoButton':
              if (component && component.href && component.text) {
                return (
                  <LogoButton
                    key={index}
                    href={component.href}
                    text={component.text}
                    appearance={component.logo_button_appearance}
                    label={component.label}
                    logo={component.logo}
                  />
                );
              }
              return null;
            case 'ComponentComponentsFaq':
              if (component && component?.faq && component?.faq?.data && component?.faq?.data.attributes) {
                return (
                  <FAQSection
                    key={index}
                    locale={locale}
                    accordion={component.faq.data.attributes.faq.accordion}
                    sectionTitle={component.faq.data.attributes.title}
                    priceData={priceData}
                    strapiBackendURL={strapiImageURL}
                  />
                );
              }
              return null;
            case 'ComponentComponentsAccordionSection':
              return (
                <AccordionProvider
                  sections={component.item.map(({ id, title, body }: any) => ({
                    id,
                    label: title,
                    headingLevel: 3, // TODO add this property from CMS
                    body: (
                      <Markdown priceData={priceData} locale={locale} strapiBackendURL={strapiImageURL}>
                        {body}
                      </Markdown>
                    ),
                  }))}
                />
              );
            case 'ComponentComponentsImage':
              if (
                component.imageData &&
                component.imageData.data.attributes &&
                component.imageData.data.attributes.url
              ) {
                return (
                  <Image
                    src={`${strapiImageURL}${component.imageData.data.attributes.url}`}
                    alt={component.imageData.data.attributes.alternativeText || ''}
                    sizes="(max-width: 768px) 100vw,
                              (max-width: 1200px) 50vw,
                              33vw"
                    width={component.imageData.data.attributes.width}
                    height={component.imageData.data.attributes.height}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                );
              } else {
                return null;
              }
            case 'ComponentComponentsSpotlight':
              return component.content ? (
                <SpotlightSection type={component.type} aside={component?.aside}>
                  <Markdown strapiBackendURL={strapiImageURL} priceData={priceData}>
                    {component.content}
                  </Markdown>
                </SpotlightSection>
              ) : null;
            case 'ComponentComponentsButtonLink':
              return component.text && component.href ? (
                <div>
                  <Paragraph>{component?.label}</Paragraph>
                  <ButtonLink appearance={`${component?.button_link_appearance}-action-button`} href={component.href}>
                    {component.text}
                  </ButtonLink>
                </div>
              ) : null;
            case 'ComponentComponentsMultiColumnsButton':
              return (
                <div className="utrecht-multi-columns-button">
                  {component.column.map(({ logoButton, title, headingLevel }: any, index: number) => {
                    return (
                      <div key={index} className="utrecht-multi-columns-button__item">
                        <Heading level={headingLevel || 3}>{title}</Heading>
                        {logoButton &&
                          logoButton.length > 0 &&
                          logoButton.map((item: any, index: number) => (
                            <LogoButton
                              key={index}
                              href={item.href}
                              text={item.text}
                              appearance={item.logo_button_appearance}
                              label={item.label}
                              logo={item.logo}
                            />
                          ))}
                      </div>
                    );
                  })}
                </div>
              );
            default:
              return <></>;
          }
        })
      : null;
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
            current: false,
          },
          {
            href: '/products',
            label: t('components.breadcrumbs.label.products'),
            current: true,
          },
        ]}
      />
      <Article>
        {isCurrentPreviewTokenValid && isEnabled && (
          <PreviewAlert
            link={{
              href: `/api/clear-preview?slug=${locale}${slug}&default_locale=${fallbackLng}`,
              text: t('preview-alert.button'),
            }}
            message={t('preview-alert.message')}
          />
        )}
        <Heading1>{product?.attributes.title}</Heading1>
        <Sections />
      </Article>
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

export default Product;
