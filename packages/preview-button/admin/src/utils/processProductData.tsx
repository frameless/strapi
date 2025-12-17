import { AdvancedLink, Columns, Img, LogoButton, LogoType, MultiColumnsButton } from '@frameless/ui';
import { getDirectionFromLanguageCode } from '@frameless/utils';
import { ButtonGroup, SpotlightSection } from '@utrecht/component-library-react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { LogoButtonSection } from '../../../types';
import { Markdown } from '../components';
import { PriceType } from '../components/Content';

interface CTAColumn {
  logoButton?: LogoButtonData[];
  [key: string]: any;
}

interface LogoButtonData extends Omit<LogoButtonSection, 'logo' | '__component' | 'id'> {
  logo?: LogoType;
  openFormsEmbed?: string;
}

interface ImageData {
  url?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  caption?: string;
}

interface SectionDataItem {
  id?: string;
  label?: string;
  body?: string;
}

export interface SectionData {
  __component?: string;
  id?: string;
  kennisartikelCategorie?: string | null;
  href?: string;
  textContent?: string;
  icon?: 'arrow' | 'chevronLeft';
  language?: string;
  imageData?: ImageData;
  item?: SectionDataItem[];
  column?: CTAColumn[];
  type?: string;
  content?: string;
  logoButton?: LogoButtonData[];
  openFormsEmbed?: string;
  // allow other props
  [key: string]: any;
}

interface ProcessProductDataParams {
  data: SectionData[];
  priceData?: PriceType[];
  locale: string;
  url: URL | null;
}

/** Parse an "openFormsEmbed" query-string-like value into named parts. */
const parseOpenFormsEmbedData = (openFormsEmbed?: string) => {
  if (!openFormsEmbed)
    return { slug: null as string | null, uuid: null as string | null, label: null as string | null };
  const params = new URLSearchParams(openFormsEmbed);
  const slug = params.get('slug');
  const uuid = params.get('uuid');
  const label = params.get('label');
  return { slug, uuid, label };
};

/** Build a proper href for a form. If base URL is provided, returns an absolute URL; else relative path. */
const buildFormHref = (base: URL | null, slug?: string | null) => {
  if (!slug) return '';
  // encode slug to be safe
  const safeSlug = encodeURIComponent(slug);
  try {
    return base ? new URL(`/form/${safeSlug}`, base).toString() : `/form/${safeSlug}`;
  } catch {
    return `/form/${safeSlug}`;
  }
};

/** Basic external detection for hrefs (used for 'external' prop). */
const isExternalHref = (href?: string) => {
  if (!href) return false;
  return /^https?:\/\//i.test(href);
};

const processCTAColumns = ({ data, url }: { data: CTAColumn[]; url: URL | null }): Columns[] =>
  (data || []).map((column) => {
    const mappedLogoButtons =
      column?.logoButton
        ?.map((button) => {
          if (!button) return null;
          if (button.openFormsEmbed) {
            const { slug, uuid, label } = parseOpenFormsEmbedData(button.openFormsEmbed);
            if (!slug) return null;
            return {
              label: button.label || '',
              appearance: button.appearance || '',
              logo: button.logo,
              href: buildFormHref(url, slug),
              children: label || button.textContent || '',
              id: uuid || undefined,
            };
          }
          return {
            label: button.label || '',
            appearance: button.appearance || '',
            logo: button.logo,
            href: button.href || '',
            children: button.textContent || '',
          };
        })
        .filter(Boolean) || [];

    // Keep any other column props intact, but override logoButton with the mapped array.
    return {
      ...column,
      logoButton: mappedLogoButtons,
    } as Columns;
  });

/** Render a <LogoButton> React element (or null) from LogoButtonData. */
const logoButtonElement = ({ data, url }: { data?: LogoButtonData; url: URL | null }) => {
  if (!data) return null;

  if (data.openFormsEmbed) {
    const { slug, label } = parseOpenFormsEmbedData(data.openFormsEmbed);
    const href = buildFormHref(url, slug);
    // if slug missing but href provided, fall back to href; otherwise skip
    const finalHref = href || data.href || '';
    if (!finalHref) return null;

    return (
      <LogoButton
        // don't pass key here; callers should set keys if rendering lists
        label={data.label}
        appearance={data?.appearance ?? undefined}
        logo={data.logo}
        href={finalHref}
      >
        {data.textContent || label}
      </LogoButton>
    );
  }

  // normal (non-embed) button
  return (
    <LogoButton
      href={data?.href || ''}
      appearance={data?.appearance ?? undefined}
      label={data?.label}
      logo={data?.logo}
    >
      {data?.textContent}
    </LogoButton>
  );
};

export const processProductData = ({ data, priceData, locale, url }: ProcessProductDataParams) => {
  if (!Array.isArray(data)) return {};

  return data.map((section, index) => {
    switch (section?.__component) {
      case 'components.utrecht-rich-text':
        // pass through unchanged
        return section;

      case 'components.utrecht-logo-button':
        return {
          id: section?.id,
          kennisartikelCategorie: section?.kennisartikelCategorie,
          content: renderToString(logoButtonElement({ data: section as LogoButtonData, url })),
        };

      case 'components.utrecht-link':
        return {
          id: section?.id,
          kennisartikelCategorie: section?.kennisartikelCategorie,
          content: renderToString(
            <ButtonGroup className="utrecht-link-group">
              <AdvancedLink
                key={section?.href}
                href={section?.href}
                external={isExternalHref(section?.href)}
                icon={section?.icon}
                lang={section?.language ?? undefined}
                dir={section?.language ? getDirectionFromLanguageCode(section.language) : undefined}
              >
                {section?.textContent || ''}
              </AdvancedLink>
            </ButtonGroup>,
          ),
        };

      case 'components.utrecht-image':
        return {
          id: section?.id,
          kennisartikelCategorie: section?.kennisartikelCategorie,
          content: renderToString(
            <Img
              src={section?.imageData?.url}
              width={section?.imageData?.width}
              height={section?.imageData?.height}
              alt={section?.imageData?.alternativeText}
              figure={section?.imageData?.caption}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />,
          ),
        };

      case 'components.utrecht-accordion':
        return {
          id: section?.id,
          kennisartikelCategorie: section?.kennisartikelCategorie,
          content:
            section?.item
              ?.map((item) => {
                return renderToString(
                  <details key={item?.id}>
                    <summary>{item?.label}</summary>
                    {item?.body && (
                      <Markdown priceData={priceData} locale={locale}>
                        {item?.body}
                      </Markdown>
                    )}
                  </details>,
                );
              })
              .join('') || '',
        };

      case 'components.utrecht-multi-columns-button':
        return {
          id: section?.id,
          kennisartikelCategorie: section?.kennisartikelCategorie,
          content: renderToString(
            <MultiColumnsButton
              key={index}
              columns={processCTAColumns({
                data: section.column || [],
                url,
              })}
            />,
          ),
        };

      case 'components.utrecht-spotlight':
        return {
          id: section?.id,
          kennisartikelCategorie: section?.kennisartikelCategorie,
          content: renderToString(
            <SpotlightSection type={section?.type || ''}>
              {section?.content && (
                <Markdown priceData={priceData} locale={locale}>
                  {section.content}
                </Markdown>
              )}

              {/* Render logo buttons with proper keys */}
              {section?.logoButton &&
                section.logoButton.length > 0 &&
                section.logoButton
                  .map((button, idx) => {
                    const element = logoButtonElement({ data: button, url });
                    // Add key prop to each valid element
                    return element ? React.cloneElement(element, { key: `logo-btn-${idx}` }) : null;
                  })
                  .filter(Boolean)}
            </SpotlightSection>,
          ),
        };
      default:
        return null;
    }
  });
};
