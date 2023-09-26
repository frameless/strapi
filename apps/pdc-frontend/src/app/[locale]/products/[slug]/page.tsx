import { Metadata } from 'next';
import { cookies, draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { fallbackLng } from '@/app/i18n/settings';
import {
  AccordionProvider,
  Article,
  ButtonLink,
  Heading,
  PageTitle,
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
import { Img } from '@/components/Img';
import { Markdown } from '@/components/Markdown';
import { PreviewAlert } from '@/components/PreviewAlert';
import { ReactionLink } from '@/components/ReactionLink';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { GET_PRODUCT_BY_SLUG_FETCH } from '@/query';
import { buildImgURL } from '@/util/buildImgURL';
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

  const { t } = await useTranslation(locale, 'common');
  const Sections = () =>
    product?.attributes && product?.attributes.sections.length > 0
      ? product?.attributes.sections.map((component: any, index: number) => {
          switch (component.__typename) {
            case 'ComponentComponentsBlockContent':
              return component.content ? (
                <Markdown locale={locale} key={index} priceData={priceData}>
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
                      <Markdown priceData={priceData} locale={locale}>
                        {body}
                      </Markdown>
                    ),
                  }))}
                />
              );
            case 'ComponentComponentsImage':
              return (
                <Img
                  src={buildImgURL(component?.imageData?.data?.attributes?.url)}
                  width={component?.imageData?.data?.attributes?.width}
                  height={component?.imageData?.data?.attributes?.height}
                  alt={component?.imageData?.data?.attributes?.alternativeText}
                  data-figcaption={component?.imageData?.data?.attributes?.caption}
                />
              );

            case 'ComponentComponentsSpotlight':
              return component.content ? (
                <SpotlightSection type={component.type} aside={component?.aside}>
                  <Markdown priceData={priceData}>{component.content}</Markdown>
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
        <PageTitle>{product?.attributes.title}</PageTitle>
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
