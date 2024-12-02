import { ButtonLink, Heading } from '@utrecht/component-library-react';
import { UtrechtDigidLogo, UtrechtEherkenningLogo, UtrechtEidasLogo } from '@utrecht/web-component-library-react';
import kebabCase from 'lodash.kebabcase';
import React from 'react';
import { renderToString } from 'react-dom/server';

interface IconProps {
  logo?: string;
}

export const Icon = ({ logo }: IconProps) => {
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
export type LogoButtonItemType = {
  logo?: string;
  href?: string;
  appearance?: string;
  label?: string;
  openFormsEmbed?: string | null;
  textContent?: string | null;
};
export interface LogoButtonProps {
  item: LogoButtonItemType;
  headingLevel?: number;
  withDesignSystem?: boolean;
}
export interface BasicLogoButtonProps {
  item: LogoButtonItemType;
  headingLevel?: number;
}
export const BasicLogoButton = ({ item, headingLevel }: BasicLogoButtonProps) => {
  const HeadingComponent = `h${headingLevel || 3}` as keyof React.JSX.IntrinsicElements;
  const mappingIcon = {
    eidas: 'eIDAS',
    digid: 'DigiD',
    eherkenning: 'eHerkenning',
    without_logo: null,
  };
  return (
    <div>
      {item?.label && <HeadingComponent>{item.label}</HeadingComponent>}
      <div>
        {item?.logo && <span>{mappingIcon[item?.logo as keyof typeof mappingIcon]}</span>}{' '}
        {item?.href && item?.textContent && <a href={item.href}>{item.textContent}</a>}
      </div>
    </div>
  );
};
export const LogoButton = ({ item, headingLevel, withDesignSystem = false }: LogoButtonProps) => {
  const getOpenFormsEmbed = (openFormsEmbed: any) => {
    if (!openFormsEmbed) return null;
    const parsOpenFormsEmbedData = new URLSearchParams(openFormsEmbed);
    const slug = parsOpenFormsEmbedData.get('slug');
    const label = parsOpenFormsEmbedData.get('label');
    const embed_url = parsOpenFormsEmbedData.get('embed_url');
    return {
      href: embed_url ? new URL(`/form/${slug}`, embed_url).href : '',
      textContent: label,
    };
  };
  const openFormsEmbed = getOpenFormsEmbed(item?.openFormsEmbed);
  if (withDesignSystem) {
    if (openFormsEmbed) {
      return (
        <div>
          <Heading level={headingLevel || 3}>{item?.label}</Heading>
          <div className="utrecht-logo-button">
            <Icon logo={item?.logo} />
            <ButtonLink href={openFormsEmbed.href} appearance={kebabCase(item?.appearance)}>
              {item?.textContent || openFormsEmbed.textContent}
            </ButtonLink>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Heading level={headingLevel || 3}>{item?.label}</Heading>
        <div className="utrecht-logo-button">
          <Icon logo={item?.logo} />
          <ButtonLink href={item?.href} appearance={kebabCase(item?.appearance)}>
            {item?.textContent}
          </ButtonLink>
        </div>
      </div>
    );
  }
  if (openFormsEmbed) {
    return (
      <BasicLogoButton
        item={{
          ...item,
          href: openFormsEmbed.href,
          textContent: item?.textContent || openFormsEmbed.textContent,
        }}
        headingLevel={headingLevel}
      />
    );
  }
  return <BasicLogoButton item={item} headingLevel={headingLevel} />;
};

export const convertLogoButtonToHTML = (item: any) => {
  return renderToString(<LogoButton item={item} />);
};
