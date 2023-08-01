import { ButtonLink, Heading1, Heading3, Paragraph, SpotlightSection } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import { cookies, draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { fallbackLng } from '@/app/i18n/settings';
import { Accordion } from '@/components/Accordion';
import { FAQSection } from '@/components/FAQSection';
import { Markdown } from '@/components/Markdown';
import { PreviewAlert } from '@/components/PreviewAlert';
import { UtrechtDigidButton, UtrechtDigidLogo, UtrechtEherkenningLogo, UtrechtEidasLogo } from '@/components/icons';
import { GET_PRODUCT_BY_SLUG_FETCH } from '@/query';
import { fetchData } from '@/util/fetchData';

const getAllProducts = async (locale: string, slug: string) => {
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: `${process.env.STRAPI_IMAGE_URL}/graphql` as string,
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
        <div className="utrecht-logo-button">
          {label && <Heading3>{label}</Heading3>}
          <div className="utrecht-logo-button_container">
            <UtrechtDigidLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text}
            </ButtonLink>
          </div>
        </div>
      );
    case 'eherkenning':
      return (
        <div className="utrecht-logo-button">
          {label && <Heading3>{label}</Heading3>}
          <div className="utrecht-logo-button_container">
            <UtrechtEherkenningLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text}
            </ButtonLink>
          </div>
        </div>
      );
    case 'eidas':
      return (
        <div className="utrecht-logo-button">
          {label && <Heading3>{label}</Heading3>}
          <div className="utrecht-logo-button_container">
            <UtrechtEidasLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text}
            </ButtonLink>
          </div>
        </div>
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
    title: product?.attributes.title,
    description: product?.attributes.excerpt,
    keywords: product?.attributes?.metaTags?.keymatch,
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
  const strapiImageURL = process.env.STRAPI_IMAGE_URL;
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
                component.item &&
                component.item.length > 0 &&
                component.item.map(({ body, id, title }: any) => (
                  <Accordion
                    key={id}
                    locale={locale}
                    label={title}
                    body={
                      <Markdown priceData={priceData} locale={locale} strapiBackendURL={strapiImageURL}>
                        {body}
                      </Markdown>
                    }
                  />
                ))
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
                <SpotlightSection type={component.type}>
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
                  {component.column.map(({ buttonLink, logoButton, title }: any, index: number) => (
                    <div key={index} className="utrecht-multi-columns-button__item">
                      <Heading3>{title}</Heading3>
                      {buttonLink && buttonLink.button_link_appearance && buttonLink.href && buttonLink.text && (
                        <div className="utrecht-multi-columns-button__button">
                          <Paragraph>{buttonLink.label}</Paragraph>
                          <ButtonLink
                            appearance={`${buttonLink.button_link_appearance}-action-button`}
                            href={buttonLink.href}
                          >
                            {buttonLink.text}
                          </ButtonLink>
                        </div>
                      )}
                      {logoButton && logoButton.logo_button_appearance && logoButton.href && logoButton.text && (
                        <div className="utrecht-multi-columns-button__button">
                          <Paragraph>{logoButton.label}</Paragraph>
                          <UtrechtDigidButton>
                            <ButtonLink
                              appearance={`${logoButton.logo_button_appearance}-action-button`}
                              href={logoButton.href}
                            >
                              {logoButton.text}
                            </ButtonLink>
                          </UtrechtDigidButton>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );

            default:
              return <></>;
          }
        })
      : null;
  return (
    <>
      {isCurrentPreviewTokenValid && isEnabled && (
        <PreviewAlert
          link={{
            href: `/api/clear-preview?slug=${locale}${slug}&default_locale=${fallbackLng}`,
            text: t('preview-alert.button'),
          }}
          message={t('preview-alert.message')}
        />
      )}
      <Heading1 style={{ marginBlockStart: '3rem' }}>{product?.attributes.title}</Heading1>
      <Sections />
    </>
  );
};

export default Product;
