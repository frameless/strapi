import { buildURL, encodeHtmlEntities, getDirectionFromLanguageCode, getPathAndSearchParams } from '@frameless/utils';
import { SpotlightSectionType } from '@utrecht/component-library-react/dist/SpotlightSection';
import type { TFunction } from 'i18next';
import isAbsoluteUrl from 'is-absolute-url';
import { Metadata } from 'next';
import { draftMode, headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { languages } from '@/app/i18n/settings';
import {
  AccordionProvider,
  AdvancedLink,
  Alert,
  Article,
  Breadcrumbs,
  ButtonGroup,
  FloLegalDecisionTree,
  Grid,
  GridCell,
  Heading,
  Img,
  LogoButton,
  Markdown,
  MultiColumnsButton,
  RichText,
  ScrollToTopButton,
  SpotlightSection,
  UtrechtIconChevronUp,
} from '@/components';
import { KCMSurvey } from '@/components/KCMSurvey';
import { SurveyLink } from '@/components/SurveyLink';
import { GET_PRODUCT_BY_SLUG } from '@/query';
import {
  buildAlternateLinks,
  fetchData,
  getFloLegalData,
  getFloLegalURLs,
  getImageBaseUrl,
  getStrapiGraphqlURL,
} from '@/util';
import { GetProductBySlugQuery, ProductSectionsDynamicZone } from '../../../../../../gql/graphql';

const getAllProducts = async (locale: string, slug: string) => {
  const { isEnabled } = draftMode();
  const { data } = await fetchData<{ data: GetProductBySlugQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_PRODUCT_BY_SLUG,
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

export async function generateMetadata({ params }: { params: ParamsType }): Promise<Metadata> {
  const locale = params?.locale;
  const slug = params?.slug;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'common');
  const { product } = await getAllProducts(locale, slug);

  const url = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    segments: ['segments.products', slug],
    locale,
  });

  const title = product?.attributes?.metaTags?.title;
  const description = product?.attributes?.metaTags?.description;
  const openGraphImage = getImageBaseUrl(product?.attributes?.metaTags?.ogImage?.data?.attributes?.url);

  return {
    title,
    description,
    other: {
      keymatch: product?.attributes?.metaTags?.keymatch as string,
    },
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')}`,
      description,
      images: openGraphImage,
      locale,
      url: url?.href,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
    alternates: {
      canonical: url?.href,
      languages: {
        ...buildAlternateLinks({ languages, segment: url?.href }),
      },
    },
  };
}
interface SectionsProps {
  sections: ProductSectionsDynamicZone[];
  priceData: any;
  locale: string;
  t: TFunction<string, any, string>;
  nonce?: string;
}

const Sections = ({ sections, locale, priceData, t, nonce }: SectionsProps) => (
  <>
    {sections &&
      sections.map(async (component, index: number) => {
        switch (component?.__typename) {
          case 'ComponentComponentsFloLegalForm':
            // eslint-disable-next-line no-case-declarations
            const { floLegalFormApiURL } = getFloLegalURLs();
            // eslint-disable-next-line no-case-declarations
            const floLegalData = await getFloLegalData({
              selector: component.floLegalFormSelector ?? undefined,
              config: {
                api_token: process.env.FLO_LEGAL_API_TOKEN,
                api_url: floLegalFormApiURL,
              },
            });

            if (floLegalData?.errorCode === 'timeout') return <Alert type="error">{t('errors.timeout')}</Alert>;
            return (
              <FloLegalDecisionTree
                showOutcomes={true}
                outcomesHeader={floLegalData?.name}
                encodedData={encodeHtmlEntities(JSON.stringify(floLegalData?.content))}
                key={index}
              >
                <Script src="/flo-client-plugin.js" nonce={nonce} />
              </FloLegalDecisionTree>
            );
          case 'ComponentComponentsUtrechtRichText':
            return (
              component.content && (
                <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale} key={index}>
                  {component.content}
                </Markdown>
              )
            );
          case 'ComponentComponentsUtrechtLogoButton':
            if (component.openFormsEmbed) {
              const parsOpenFormsEmbedData = new URLSearchParams(component.openFormsEmbed);
              const slug = parsOpenFormsEmbedData.get('slug');
              const uuid = parsOpenFormsEmbedData.get('uuid');
              const label = parsOpenFormsEmbedData.get('label');
              const { pathSegments } = getPathAndSearchParams({
                locale,
                translations: t,
                segments: ['segments.form', slug as string],
              });

              return (
                <LogoButton
                  key={uuid}
                  label={component.label}
                  appearance={component?.appearance as string}
                  logo={component.logo}
                  href={`/${pathSegments}`}
                >
                  {component.textContent || label}
                </LogoButton>
              );
            }
            if (component && component.href && component.textContent) {
              return (
                <LogoButton
                  key={index}
                  href={component.href}
                  appearance={component.appearance as string}
                  label={component.label}
                  logo={component.logo}
                >
                  {component.textContent}
                </LogoButton>
              );
            }
            return <></>;
          case 'ComponentComponentsFaq':
            if (
              component.pdc_faq?.data?.attributes &&
              component.pdc_faq.data.attributes.faq &&
              component.pdc_faq.data.attributes.faq.length > 0
            ) {
              return (
                <AccordionProvider
                  sections={component.pdc_faq.data.attributes.faq.map((faqItem) => ({
                    id: faqItem?.id,
                    label: faqItem?.label as string,
                    headingLevel: faqItem?.headingLevel || 2,
                    body: faqItem?.body && (
                      <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
                        {faqItem.body}
                      </Markdown>
                    ),
                  }))}
                />
              );
            }
            return <></>;
          case 'ComponentComponentsUtrechtAccordion':
            if (component?.item && component.item.length > 0) {
              return (
                <AccordionProvider
                  sections={component.item.map((accordionItem) => ({
                    id: accordionItem?.id,
                    label: accordionItem?.label as string,
                    headingLevel: accordionItem?.headingLevel || 2,
                    body: accordionItem?.body && (
                      <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
                        {accordionItem.body}
                      </Markdown>
                    ),
                  }))}
                />
              );
            }
            return <></>;
          case 'ComponentComponentsUtrechtImage':
            if (
              component.imageData?.data?.attributes?.width &&
              component.imageData?.data?.attributes?.height &&
              component?.imageData?.data?.attributes?.url
            ) {
              const imageURL = getImageBaseUrl(component?.imageData?.data?.attributes?.url);
              return (
                <Img
                  Image={Image}
                  src={imageURL}
                  width={component?.imageData?.data?.attributes?.width}
                  height={component?.imageData?.data?.attributes?.height}
                  alt={component?.imageData?.data?.attributes?.alternativeText || ''}
                  figure={component?.imageData?.data?.attributes?.caption || ''}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              );
            }
            return <></>;
          case 'ComponentComponentsUtrechtSpotlight':
            return (
              component.content && (
                <SpotlightSection type={component.type as SpotlightSectionType}>
                  <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
                    {component.content}
                  </Markdown>
                  {component?.logoButton &&
                    component?.logoButton.length > 0 &&
                    component?.logoButton?.map(
                      (button) =>
                        button?.href && (
                          <LogoButton
                            key={button?.id}
                            href={button?.href}
                            appearance={button?.appearance as string}
                            label={button?.label}
                            logo={button?.logo}
                          >
                            {button?.textContent}
                          </LogoButton>
                        ),
                    )}
                </SpotlightSection>
              )
            );
          case 'ComponentComponentsUtrechtMultiColumnsButton':
            return <MultiColumnsButton columns={component.column as any} />;
          case 'ComponentComponentsUtrechtLink':
            return (
              component?.href &&
              component?.textContent && (
                <ButtonGroup className="utrecht-link-group">
                  <AdvancedLink
                    key={component?.href}
                    href={component?.href}
                    external={isAbsoluteUrl(component?.href)}
                    icon={component?.icon as 'arrow'}
                    lang={component?.language ?? undefined}
                    dir={component?.language ? getDirectionFromLanguageCode(component.language) : undefined}
                  >
                    {component?.textContent}
                  </AdvancedLink>
                </ButtonGroup>
              )
            );
          default:
            return <></>;
        }
      })}
  </>
);

const Product = async ({ params: { locale, slug } }: ProductProps) => {
  const { product } = await getAllProducts(locale, slug);
  const nonce = headers().get('x-nonce') || '';
  const priceData: any = product?.attributes?.price && product?.attributes?.price?.data?.attributes?.price;

  const { t } = await useTranslation(locale, 'common');

  const { pathSegments: productsSegment } = getPathAndSearchParams({
    locale,
    translations: t,
    segments: ['segments.products'],
  });

  const surveyLinkURL = buildURL({
    env: process.env,
    translations: t,
    key: 'FRONTEND_PUBLIC_URL',
    segments: ['segments.products', slug],
    locale,
  });

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
            current: false,
          },
          {
            href: `/${productsSegment}`,
            label: t('components.breadcrumbs.label.products'),
            current: true,
          },
        ]}
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.products'),
          current: false,
        }}
        Link={Link}
      />
      <main id="main">
        <Article>
          <RichText>
            <Heading level={1}>{product?.attributes?.title}</Heading>
            {product?.attributes?.content && (
              <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
                {product?.attributes?.content}
              </Markdown>
            )}
            {product?.attributes?.sections && product.attributes.sections.length > 0 && (
              <Sections
                t={t}
                sections={product.attributes.sections as ProductSectionsDynamicZone[]}
                locale={locale}
                priceData={priceData}
                nonce={nonce}
              />
            )}
          </RichText>
        </Article>
        <Grid justifyContent="space-between" spacing="sm">
          <GridCell sm={8}>
            <SurveyLink segment={surveyLinkURL.href} t={t} env={process.env} />
          </GridCell>
          <GridCell sm={4} justifyContent="flex-end">
            <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
          {(product?.attributes?.enable_kcm_survey ?? true) && <KCMSurvey nonce={nonce} />}
        </Grid>
      </main>
    </>
  );
};

export default Product;
