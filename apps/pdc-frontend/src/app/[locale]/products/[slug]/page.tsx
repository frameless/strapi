import { SpotlightSectionType } from '@utrecht/component-library-react/dist/SpotlightSection';
import isAbsoluteUrl from 'is-absolute-url';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import {
  AccordionProvider,
  AdvancedLink,
  Article,
  Breadcrumbs,
  Grid,
  GridCell,
  Heading,
  Img,
  LogoButton,
  Markdown,
  MultiColumnsButton,
  ScrollToTopButton,
  SpotlightSection,
  UtrechtIconChevronUp,
} from '@/components';
import { GET_PRODUCT_BY_SLUG } from '@/query';
import { getImageBaseUrl } from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GetProductBySlugQuery, ProductSectionsDynamicZone } from '../../../../../gql/graphql';

const getAllProducts = async (locale: string, slug: string) => {
  const { isEnabled } = draftMode();
  const { data } = await fetchData<{ data: GetProductBySlugQuery }>({
    url: createStrapiURL(),
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
      keymatch: product?.attributes?.metaTags?.keymatch as string,
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

interface SectionsProps {
  sections: ProductSectionsDynamicZone[];
  priceData: any;
  locale: string;
}

const Sections = ({ sections, locale, priceData }: SectionsProps) => {
  return (
    <>
      {sections &&
        sections.map((component, index: number) => {
          switch (component?.__typename) {
            case 'ComponentComponentsUtrechtRichText':
              return (
                component.content && (
                  <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale} key={index}>
                    {component.content}
                  </Markdown>
                )
              );
            case 'ComponentComponentsUtrechtLogoButton':
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
                      headingLevel: 3,
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
                      headingLevel: 3,
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
                return (
                  <Img
                    Image={Image}
                    src={`${getImageBaseUrl()}${component?.imageData?.data?.attributes?.url}`}
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
                  <AdvancedLink
                    href={component?.href}
                    external={isAbsoluteUrl(component?.href)}
                    icon={component?.icon as 'arrow'}
                  >
                    {component?.textContent}
                  </AdvancedLink>
                )
              );
            default:
              return <></>;
          }
        })}
    </>
  );
};

const Product = async ({ params: { locale, slug } }: ProductProps) => {
  const { product } = await getAllProducts(locale, slug);

  const priceData: any = product?.attributes?.price && product?.attributes?.price?.data?.attributes?.price;

  const { t } = await useTranslation(locale, 'common');

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
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.products'),
          current: false,
        }}
        Link={Link}
      />
      <Article>
        <Heading level={1}>{product?.attributes?.title}</Heading>
        {product?.attributes?.content && (
          <Markdown imageUrl={getImageBaseUrl()} priceData={priceData} locale={locale}>
            {product?.attributes?.content}
          </Markdown>
        )}
        {product?.attributes?.sections && product.attributes.sections.length > 0 && (
          <Sections
            sections={product.attributes.sections as ProductSectionsDynamicZone[]}
            locale={locale}
            priceData={priceData}
          />
        )}
      </Article>
      <Grid justifyContent="space-between" spacing="sm">
        <GridCell sm={8}>
          <AdvancedLink
            rel="noopener noreferrer"
            external
            icon="arrow"
            color="red"
            href="https://www.kcmsurvey.com/qSwudd733b9c27c2e91ba8c7b598MaSd?webpagina=Alle%20producten"
          >
            {t('actions.reaction-link')}
          </AdvancedLink>
        </GridCell>
        <GridCell sm={4} justifyContent="flex-end">
          <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
        </GridCell>
      </Grid>
    </>
  );
};

export default Product;
