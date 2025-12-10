import { AdvancedLink, Columns, Img, LogoButton, MultiColumnsButton } from '@frameless/ui';
import type { LogoButtonProps } from '@frameless/ui';
import { getDirectionFromLanguageCode } from '@frameless/utils';
import { ButtonGroup, SpotlightSection } from '@utrecht/component-library-react';
import { renderToString } from 'react-dom/server';
import { Markdown } from '../components';

type OpenFormsEmbedData = {
  slug: string | null;
  uuid: string | null;
  label: string | null;
};

const EMPTY_DATA: OpenFormsEmbedData = {
  slug: null,
  uuid: null,
  label: null,
};

export const getParsOpenFormsEmbedData = (openFormsEmbed: string | null | undefined): OpenFormsEmbedData => {
  if (!openFormsEmbed || typeof openFormsEmbed !== 'string') {
    return EMPTY_DATA;
  }

  try {
    const params = new URLSearchParams(openFormsEmbed);
    return {
      slug: params.get('slug'),
      uuid: params.get('uuid'),
      label: params.get('label'),
    };
  } catch (error) {
    console.error('Failed to parse openFormsEmbed data:', error);
    return EMPTY_DATA;
  }
};

type ButtonWithEmbed = LogoButtonProps & {
  openFormsEmbed?: string | null;
  textContent?: string | null;
};

const processCTAColumns = ({ data, url }: { data: Columns[]; url: string }): Columns[] | undefined => {
  if (!data) return undefined;

  const baseUrl = url.replace(/\/$/, '');

  return data.map((column) => {
    const logoButtons = Array.isArray(column?.logoButton)
      ? column.logoButton.map((button: ButtonWithEmbed): LogoButtonProps => {
          if (typeof button?.openFormsEmbed === 'string' && button.openFormsEmbed) {
            const { slug, label } = getParsOpenFormsEmbedData(button.openFormsEmbed);

            if (slug) {
              return {
                ...button,
                href: `${baseUrl}/form/${encodeURIComponent(slug)}`,
                children: (label ?? button.textContent ?? button.children) as string,
              };
            }
          }
          return button;
        })
      : column.logoButton;

    return {
      ...column,
      logoButton: logoButtons,
    };
  });
};

type LogoButtonData = {
  openFormsEmbed?: string | null;
  label?: string | null;
  appearance?: any;
  logo?: any;
  href?: string | null;
  textContent?: string | null;
  uuid?: string | null;
  [k: string]: any;
};

const logoButton = ({ data, url }: { data: any; url: string }) => {
  if (data?.openFormsEmbed) {
    const { slug, uuid, label } = getParsOpenFormsEmbedData(data.openFormsEmbed);
    return (
      <LogoButton
        key={uuid}
        label={data.label}
        appearance={data?.appearance}
        logo={data.logo}
        href={`${url}/form/${slug}`}
      >
        {data.textContent || label}
      </LogoButton>
    );
  }
  return (
    <LogoButton href={data.href} appearance={data.appearance} label={data.label} logo={data.logo}>
      {data.textContent}
    </LogoButton>
  );
};

interface ProcessProductDataParams {
  data: any;
  priceData?: any;
  locale?: string;
  url: string;
}

export const processProductData = ({ data, priceData, locale, url }: ProcessProductDataParams) => {
  if (!url) {
    throw new Error('url parameter is required');
  }
  return Array.isArray(data)
    ? data.map((section, index) => {
        switch (section?.__component) {
          case 'components.utrecht-rich-text':
            return section;
          case 'components.utrecht-logo-button':
            return {
              id: section?.id,
              kennisartikelCategorie: section?.kennisartikelCategorie,
              content: renderToString(logoButton({ data: section, url })),
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
                    external={section?.href}
                    icon={section?.icon}
                    lang={section?.language ?? undefined}
                    dir={section?.language ? getDirectionFromLanguageCode(section.language) : undefined}
                  >
                    {section?.textContent}
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
                  alt={section?.imageData?.alternativeText || ''}
                  figure={section?.imageData?.caption || ''}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />,
              ),
            };
          case 'components.utrecht-accordion':
            return {
              id: section?.id,
              kennisartikelCategorie: section?.kennisartikelCategorie,
              content: section?.item
                ?.map((item: any) => {
                  return renderToString(
                    <details key={item?.id}>
                      <summary>{item?.label}</summary>
                      {item?.body && (
                        <Markdown priceData={priceData} locale={locale ?? 'en'}>
                          {item?.body}
                        </Markdown>
                      )}
                    </details>,
                  );
                })
                .join(''),
            };
          case 'components.utrecht-multi-columns-button':
            return {
              id: section?.id,
              kennisartikelCategorie: section?.kennisartikelCategorie,
              content: renderToString(
                <MultiColumnsButton
                  key={index}
                  columns={processCTAColumns({
                    data: section.column,
                    url,
                  }) ?? []}
                />,
              ),
            };
          case 'components.utrecht-spotlight':
            return {
              id: section?.id,
              kennisartikelCategorie: section?.kennisartikelCategorie,
              content: renderToString(
                <SpotlightSection type={section?.type}>
                  {section?.content && (
                    <Markdown priceData={priceData} locale={locale ?? 'en'}>
                      {section.content}
                    </Markdown>
                  )}
                  {section?.logoButton &&
                    section?.logoButton.length > 0 &&
                    section?.logoButton?.map((button: any) => button?.href && logoButton({ data: button, url }))}
                </SpotlightSection>,
              ),
            };
          default:
            return null;
        }
      })
    : [];
};
