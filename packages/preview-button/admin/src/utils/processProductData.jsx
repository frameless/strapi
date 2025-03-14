import { AdvancedLink, Img, LogoButton, MultiColumnsButton } from '@frameless/ui';
import { getDirectionFromLanguageCode } from '@frameless/utils';
import { ButtonGroup, SpotlightSection } from '@utrecht/component-library-react';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Markdown } from '../components';

const getParsOpenFormsEmbedData = (openFormsEmbed) => {
  const parsOpenFormsEmbedData = new URLSearchParams(openFormsEmbed);
  const slug = parsOpenFormsEmbedData.get('slug');
  const uuid = parsOpenFormsEmbedData.get('uuid');
  const label = parsOpenFormsEmbedData.get('label');
  return { slug, uuid, label };
};

const processCTAColumns = ({ data, url }) =>
  data?.map((column) => {
    return {
      ...column,
      logoButton: column?.logoButton?.map((button) => {
        if (button?.openFormsEmbed) {
          const { slug, label } = getParsOpenFormsEmbedData(button.openFormsEmbed);
          return {
            ...button,
            href: `${url}/form/${slug}`,
            textContent: label,
            openFormsEmbed: null,
          };
        }
        return button;
      }),
    };
  });

const logoButton = ({ data, url }) => {
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

export const processProductData = ({ data, priceData, locale, url }) => {
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
                  })}
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
                    <Markdown priceData={priceData} locale={locale}>
                      {section.content}
                    </Markdown>
                  )}
                  {section?.logoButton &&
                    section?.logoButton.length > 0 &&
                    section?.logoButton?.map((button) => button?.href && logoButton({ data: button, url }))}
                </SpotlightSection>,
              ),
            };
          default:
            return null;
        }
      })
    : {};
};
