import { buildURL, encodeHtmlEntities, getDirectionFromLanguageCode, getPathAndSearchParams } from '@frameless/utils';
import type { TFunction } from 'i18next';
import isAbsoluteUrl from 'is-absolute-url';
import { Metadata } from 'next';
import { draftMode, headers } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { GetProductBySlugQuery, ProductSectionsDynamicZone } from '../../../../../../gql/graphql';

import { useTranslation } from '@/app/i18n';
import { languages } from '@/app/i18n/settings';
import {
  AccordionProvider,
  AdvancedLink,
  Alert,
  Article,
  Breadcrumbs,
  ButtonAppearance,
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
  SpotlightSection,
} from '@/components';
import { ContactCard } from '@/components/ContactCard';
import { KCMSurvey } from '@/components/KCMSurvey';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { GET_PRODUCT_BY_SLUG } from '@/query';
import {
  buildAlternateLinks,
  fetchData,
  getFloLegalData,
  getFloLegalURLs,
  getImageBaseUrl,
  getStrapiGraphqlURL,
} from '@/util';
import '@/styles/print.css';

type SpotlightSectionType = 'info' | 'warning' | 'error' | 'ok';
const getAllProducts = async (locale: string, slug: string) => {
  const { isEnabled } = await draftMode();
  const { data } = await fetchData<{ data: GetProductBySlugQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug,
      locale,
      status: isEnabled ? 'DRAFT' : 'PUBLISHED',
    },
  });

  if (!data || data?.products?.length === 0) notFound();

  return {
    product: data?.products?.[0],
  };
};

type ParamsType = {
  locale: string;
  slug: string;
};

interface ProductProps {
  params: Promise<ParamsType>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata(props: { params: Promise<ParamsType> }): Promise<Metadata> {
  const params = await props.params;
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

  const title = product?.metaTags?.title;
  const description = product?.metaTags?.description;
  const openGraphImage = getImageBaseUrl(product?.metaTags?.ogImage?.url);

  return {
    title,
    description,
    other: {
      keymatch: product?.metaTags?.keymatch as string,
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
  t: TFunction;
  nonce?: string;
}

const Sections = ({ sections, locale, priceData, t, nonce }: SectionsProps) => (
  <>
    {sections &&
      sections.map(async (component, index: number) => {
        switch (component?.__typename) {
          case 'ComponentComponentsContactInformationPublic':
            return (
              <ContactCard>
                <Grid spacing="sm">
                  {Array.isArray(component?.contact_information_public?.contentBlock) &&
                    component?.contact_information_public?.contentBlock?.map(
                      (block) =>
                        block?.content && (
                          <GridCell md={6} key={block?.id || index}>
                            <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
                              {block.content}
                            </Markdown>
                          </GridCell>
                        ),
                    )}
                </Grid>
              </ContactCard>
            );

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
                <Script src="/flo-client-plugin-polyfills.js" type="module" nonce={nonce} />
                <Script src="/flo-client-plugin.js" type="module" nonce={nonce} />
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
                  appearance={component?.appearance as ButtonAppearance}
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
                  appearance={component.appearance as ButtonAppearance}
                  label={component.label}
                  logo={component.logo}
                >
                  {component.textContent}
                </LogoButton>
              );
            }
            return <></>;
          case 'ComponentComponentsFaq':
            if (component.pdc_faq && component.pdc_faq?.faq && component.pdc_faq?.faq.length > 0) {
              return (
                <AccordionProvider
                  sections={component.pdc_faq.faq.map((faqItem) => ({
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
            if (component.imageData?.width && component.imageData?.height && component?.imageData?.url) {
              const imageURL = getImageBaseUrl(component?.imageData?.url);
              return (
                <Img
                  Image={Image}
                  src={imageURL}
                  width={component?.imageData?.width}
                  height={component?.imageData?.height}
                  alt={component?.imageData?.alternativeText || ''}
                  figure={component?.imageData?.caption || ''}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  // Mark as priority because this is the above-the-fold (LCP) image for faster initial load
                  loading="eager"
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
                            appearance={button?.appearance as ButtonAppearance}
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

const Product = async (props: ProductProps) => {
  const params = await props.params;
  const { locale, slug } = params;
  const { product } = await getAllProducts(locale, slug);
  const nonce = (await headers()).get('x-nonce') || '';
  const priceData: any = product?.price && product?.price?.price;
  const { t } = await useTranslation(locale, 'common');
  const { pathSegments: productsSegment } = getPathAndSearchParams({
    locale,
    translations: t,
    segments: ['segments.products'],
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
      />

      <main id="main">
        <Article>
          <RichText>
            <Heading level={1}>{product?.title}</Heading>
            {product?.content && (
              <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
                {product.content}
              </Markdown>
            )}
            {product?.sections && product.sections.length > 0 && (
              <Sections
                t={t}
                sections={product.sections as ProductSectionsDynamicZone[]}
                locale={locale}
                priceData={priceData}
                nonce={nonce}
              />
            )}
          </RichText>
        </Article>
        <Grid justifyContent="space-between" spacing="sm">
          <GridCell>{(product?.enable_kcm_survey ?? true) && <KCMSurvey nonce={nonce} />}</GridCell>
          <GridCell justifyContent="flex-end">
            <ScrollToTopButton className="utrecht-scroll-to-top-button">{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
        </Grid>
      </main>
    </>
  );
};

export default Product;
