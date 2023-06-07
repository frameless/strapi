import { ButtonLink, Heading1, Heading3, Paragraph, SpotlightSection } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { Accordion } from '@/app/[locale]/components/Accordion';
import { FAQSection } from '@/app/[locale]/components/FAQSection';
import { Markdown } from '@/app/[locale]/components/Markdown';
import { i18n, Locale } from '@/i18n-config';
import { GET_PRODUCT_BY_SLUG_FETCH } from '@/query';
import { getDictionary } from '../../../../get-dictionary';
import { PreviewAlert } from '../../components/PreviewAlert';
import { UtrechtDigidButton, UtrechtDigidLogo, UtrechtEherkenningLogo, UtrechtEidasLogo } from '../../components/icons';

const getAllProducts = async (locale: Locale, slug: string, secretToken?: string) => {
  const { isEnabled } = draftMode();

  if (!secretToken) {
    draftMode().disable();
  }

  const response = await fetch(process.env.STRAPI_BACKEND_URL as string, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_PRODUCT_BY_SLUG_FETCH,
      variables: {
        slug: slug,
        locale: locale,
        pageMode: isEnabled ? 'PREVIEW' : 'LIVE',
      },
    }),
  });

  const { data } = await response.json();

  if (!data || data?.products?.data?.length === 0) {
    notFound();
  }
  const localizations =
    data.products.data[0]?.attributes?.localizations.data.map(({ attributes }: any) => attributes) || [];
  localizations.push({
    locale: data.products.data[0]?.attributes.locale,
    slug: data.products.data[0]?.attributes.slug,
    __typename: 'Product',
  });

  return {
    props: {
      product: data?.products.data[0],
      localizations,
      preview: isEnabled ? isEnabled : null,
    },
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
  locale: Locale;
  slug: string;
};

interface ProductProps {
  params: ParamsType;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ slug, locale }: any): Promise<Metadata> {
  const { props } = await getAllProducts(locale, slug);

  return {
    title: props.product?.attributes.title,
    description: props.product?.attributes.excerpt,
    keywords: props.product?.attributes?.metaTags?.keymatch,
  };
}

const Product = async ({ params: { locale, slug }, searchParams }: ProductProps) => {
  const { props } = await getAllProducts(locale, slug, searchParams?.secret as string);
  const priceData = props.product?.attributes.price && props.product?.attributes.price?.data?.attributes.price;
  const { origin } = new URL(process.env.STRAPI_BACKEND_URL as string);
  const dict = await getDictionary(locale);
  const Sections = () =>
    props.product?.attributes && props.product?.attributes.sections.length > 0
      ? props.product?.attributes.sections.map((component: any, index: number) => {
          switch (component.__typename) {
            case 'ComponentComponentsBlockContent':
              return component.content ? (
                <Markdown strapiBackendURL={origin} locale={locale} key={index} priceData={priceData}>
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
                    strapiBackendURL={origin}
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
                      <Markdown priceData={priceData} locale={locale} strapiBackendURL={origin}>
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
                    src={`${origin}${component.imageData.data.attributes.url}`}
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
                  <Markdown strapiBackendURL={origin} priceData={priceData}>
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
      {props.preview && (
        <PreviewAlert
          link={{
            href: `/api/clear-preview?slug=${locale}${slug}&default_locale=${i18n.defaultLocale}`,
            text: dict.actions['turn-off-the-preview-mode'],
          }}
          message={dict.warnings['preview-mode']}
        />
      )}
      <Heading1 style={{ marginBlockStart: '3rem' }}>{props.product?.attributes.title}</Heading1>
      <Sections />
    </>
  );
};

export default Product;
