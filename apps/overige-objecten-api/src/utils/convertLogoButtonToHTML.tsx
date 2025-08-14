import { ButtonLink, Heading } from '@utrecht/component-library-react';
import { UtrechtDigidLogo, UtrechtEherkenningLogo, UtrechtEidasLogo } from '@utrecht/web-component-library-react';
import kebabCase from 'lodash.kebabcase';
import React from 'react';
import { renderToString } from 'react-dom/server';

export interface LogoButtonItemType {
  logo?: string;
  href?: string;
  appearance?: string;
  label?: string;
  openFormsEmbed?: string | null;
  textContent?: string | null;
}

export interface LogoButtonProps {
  item: LogoButtonItemType;
  headingLevel?: number;
  withDesignSystem?: boolean;
}

export const Icon = ({ logo }: { logo?: string }) => {
  switch (logo) {
    case 'eidas':
      return <UtrechtEidasLogo />;
    case 'digid':
      return <UtrechtDigidLogo />;
    case 'eherkenning':
      return <UtrechtEherkenningLogo />;
    default:
      return null;
  }
};

const parseOpenFormsEmbed = (
  openFormsEmbed: string | null | undefined,
): { href: string; textContent: string } | null => {
  if (!openFormsEmbed) return null;

  const params = new URLSearchParams(openFormsEmbed);
  const slug = params.get('slug');
  const label = params.get('label');

  if (!slug || !process.env?.FRONTEND_PUBLIC_URL) return null;

  return {
    href: new URL(`/form/${slug}`, process.env.FRONTEND_PUBLIC_URL).href,
    textContent: label || '',
  };
};

export const BasicLogoButton = ({ item, headingLevel = 3 }: { item: LogoButtonItemType; headingLevel?: number }) => {
  const HeadingTag = `h${headingLevel}` as keyof React.JSX.IntrinsicElements;
  const iconLabelMap: Record<string, string | null> = {
    eidas: 'eIDAS',
    digid: 'DigiD',
    eherkenning: 'eHerkenning',
    without_logo: null,
  };

  return (
    <div>
      {item?.label && <HeadingTag>{item.label}</HeadingTag>}
      <div>
        {item?.logo && <span>{iconLabelMap[item.logo]}</span>}
        {item?.href && item?.textContent && <a href={item.href}>{item.textContent}</a>}
      </div>
    </div>
  );
};

export const LogoButton = ({ item, headingLevel = 3, withDesignSystem = false }: LogoButtonProps) => {
  const embedData = parseOpenFormsEmbed(item.openFormsEmbed);
  const finalHref = embedData?.href || item.href || '';
  const finalText = item?.textContent || embedData?.textContent || '';
  const finalLabel = item?.label || embedData?.textContent || '';

  if (withDesignSystem) {
    return (
      <div>
        <Heading level={headingLevel}>{finalLabel}</Heading>
        <div className="utrecht-logo-button">
          <Icon logo={item.logo} />
          <ButtonLink href={finalHref} appearance={kebabCase(item.appearance)}>
            {finalText}
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <BasicLogoButton
      item={{
        ...item,
        href: finalHref,
        textContent: finalText,
        label: finalLabel,
      }}
      headingLevel={headingLevel}
    />
  );
};

export const convertLogoButtonToHTML = (item: LogoButtonItemType) => renderToString(<LogoButton item={item} />);
