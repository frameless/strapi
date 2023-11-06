import isAbsoluteUrl from 'is-absolute-url';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { fallbackLng } from '@/app/i18n/settings';
import {
  AccordionProvider,
  AdvancedLink,
  Article,
  ButtonLink,
  Heading3,
  Img,
  LogoButton,
  Markdown,
  MultiColumnsButton,
  PageTitle,
  SpotlightSection,
  UtrechtIconArrow,
} from '@/components';
import { BottomBar, BottomBarItem } from '@/components/BottomBar';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { FAQSection } from '@/components/FAQSection';
import { PreviewAlert } from '@/components/PreviewAlert';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { GET_PRODUCT_BY_SLUG_FETCH } from '@/query';
import { getImageBaseUrl } from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const getAllProducts = async (locale: string, slug: string) => {
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_PRODUCT_BY_SLUG_FETCH,
    variables: {
      slug,
      locale,
      pageMode: isEnabled ? 'PREVIEW' : 'LIVE',
    },
  });

  if (!data || data?.products?.data?.length === 0) notFound();

  return {
    product: data?.products?.data[0],
  };
};

type ParamsType = {
  locale: string;
  slug: string;
};

interface ProductProps {
  params: ParamsType;
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params?.locale, 'common');
  const { product } = await getAllProducts(params?.locale, params?.slug);
  const title = product?.attributes?.metaTags?.title;
  const description = product?.attributes?.metaTags?.description;
  const openGraphImage = product?.attributes?.metaTags?.ogImage?.data?.attributes?.url;

  return {
    title,
    description,
    other: {
      keymatch: product?.attributes?.metaTags?.keymatch,
    },
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')}`,
      description,
      images: openGraphImage && getImageBaseUrl() && `${getImageBaseUrl()}${openGraphImage}`,
      locale: params?.locale,
      url: `${process.env.FRONTEND_PUBLIC_URL}/${params?.locale}/products/${params?.slug}`,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
  };
}

const Product = async ({ params: { locale, slug } }: ProductProps) => {
  const { isEnabled } = draftMode();
  const { product } = await getAllProducts(locale, slug);

  const priceData = product?.attributes.price && product?.attributes.price?.data?.attributes.price;

  const { t } = await useTranslation(locale, 'common');
  const Sections = () =>
    product?.attributes && product?.attributes.sections.length > 0
      ? product?.attributes.sections.map((component: any, index: number) => {
          switch (component?.__typename) {
            case 'ComponentComponentsBlockContent':
              return component.content ? (
                <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale} key={index}>
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
                    imageUrl={getImageBaseUrl()}
                    locale={locale}
                    accordion={component.faq.data.attributes.faq.accordion}
                    sectionTitle={component.faq.data.attributes.title}
                    priceData={priceData}
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
                    headingLevel: 3,
                    body: (
                      <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
                        {body}
                      </Markdown>
                    ),
                  }))}
                />
              );
            case 'ComponentComponentsImage':
              return (
                <Img
                  Image={Image}
                  src={`${getImageBaseUrl()}${component?.imageData?.data?.attributes?.url}`}
                  width={component?.imageData?.data?.attributes?.width}
                  height={component?.imageData?.data?.attributes?.height}
                  alt={component?.imageData?.data?.attributes?.alternativeText}
                  figure={component?.imageData?.data?.attributes?.caption}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              );
            case 'ComponentComponentsSpotlight':
              return component.content ? (
                <SpotlightSection type={component.type !== 'gray' && component.type}>
                  <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
                    {component.content}
                  </Markdown>
                  {component?.logoButton &&
                    component?.logoButton.length > 0 &&
                    component?.logoButton?.map((button: any) => (
                      <LogoButton
                        key={button.id}
                        href={button.href}
                        text={button.text}
                        appearance={button.logo_button_appearance}
                        label={button.label}
                        logo={button.logo}
                      />
                    ))}
                </SpotlightSection>
              ) : null;
            case 'ComponentComponentsButtonLink':
              return component?.text && component?.href ? (
                <div>
                  {component?.label && <Heading3>{component?.label}</Heading3>}
                  <ButtonLink
                    appearance={`${component?.button_link_appearance}-action-button`}
                    href={component.href}
                    external={isAbsoluteUrl(component?.href)}
                    rel={isAbsoluteUrl(component?.href) ? 'noopener noreferrer' : undefined}
                  >
                    {component?.text} {component?.icon === 'arrow' && <UtrechtIconArrow />}
                  </ButtonLink>
                </div>
              ) : null;
            case 'ComponentComponentsMultiColumnsButton':
              return <MultiColumnsButton columns={component.column} />;
            case 'ComponentComponentsLink':
              return component?.href && component?.text ? (
                <AdvancedLink
                  href={component?.href}
                  external={isAbsoluteUrl(component?.href)}
                  icon={component?.iconList}
                >
                  {component?.text}
                </AdvancedLink>
              ) : null;
            default:
              return <></>;
          }
        })
      : null;
  return (
    <>
      {isEnabled && (
        <PreviewAlert
          link={{
            href: `/api/clear-preview?slug=${locale}${slug}&default_locale=${fallbackLng}`,
            text: t('preview-alert.link'),
          }}
          message={t('preview-alert.message')}
        />
      )}
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
        <PageTitle>{product?.attributes.title}</PageTitle>
        {product?.attributes?.content && (
          <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
            {product?.attributes?.content}
          </Markdown>
        )}
        <Sections />
      </Article>
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

export default Product;
