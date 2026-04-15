import { ButtonLink, Heading, type ButtonLinkProps } from '@utrecht/component-library-react';
import { UtrechtDigidLogo, UtrechtEherkenningLogo, UtrechtEidasLogo } from '@utrecht/web-component-library-react';
import kebabCase from 'lodash.kebabcase';
import React, { useMemo } from 'react';
import { renderToString } from 'react-dom/server';

type LogoType = 'eidas' | 'digid' | 'eherkenning' | 'without_logo';

const VALID_LOGOS = new Set<string>(['eidas', 'digid', 'eherkenning', 'without_logo']);

const isValidLogo = (logo: unknown): logo is LogoType => {
  return typeof logo === 'string' && VALID_LOGOS.has(logo);
};

interface IconProps {
  logo?: string;
}

export type LogoButtonItemType = {
  logo?: string;
  href: string | null;
  appearance?: string;
  label: string | null;
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

const DEFAULT_HEADING_LEVEL = 3;

const LOGO_LABEL_MAP: Record<string, string | null> = {
  eidas: 'eIDAS',
  digid: 'DigiD',
  eherkenning: 'eHerkenning',
  without_logo: null,
};

/**
 * Renders the appropriate logo icon based on the logo type
 */
export const Icon = ({ logo }: IconProps) => {
  // Type-safe rendering with validation
  if (!isValidLogo(logo)) {
    return null;
  }

  switch (logo) {
    case 'eidas':
      return <UtrechtEidasLogo />;
    case 'digid':
      return <UtrechtDigidLogo />;
    case 'eherkenning':
      return <UtrechtEherkenningLogo />;
    case 'without_logo':
    default:
      return null;
  }
};

/**
 * Parses OpenForms embed string into structured data
 * Extracts slug, label, and embed_url from URL parameters
 */
const parseOpenFormsEmbed = (
  openFormsEmbed: string | null | undefined,
): { href: string; textContent: string | null } | null => {
  if (!openFormsEmbed) return null;

  try {
    const params = new URLSearchParams(openFormsEmbed);
    const slug = params.get('slug');
    const label = params.get('label');
    const embed_url = params.get('embed_url');

    // Validate required fields before using
    if (!slug || !embed_url) return null;

    return {
      href: new URL(`/form/${slug}`, embed_url).href,
      textContent: label,
    };
  } catch (error) {
    // eslint-disable-next-line no-console, no-undef
    console.error('Failed to parse openFormsEmbed:', error);
    return null;
  }
};

/**
 * Basic version without design system components
 * Renders semantic HTML with minimal styling
 */
export const BasicLogoButton = ({ item, headingLevel }: BasicLogoButtonProps) => {
  const resolvedHeadingLevel = headingLevel || DEFAULT_HEADING_LEVEL;
  const HeadingComponent = `h${resolvedHeadingLevel}` as keyof React.JSX.IntrinsicElements;
  const logoLabel = item?.logo ? LOGO_LABEL_MAP[item.logo] : null;

  return (
    <div>
      {item?.label && <HeadingComponent>{item.label}</HeadingComponent>}
      <div>
        {logoLabel && <span>{logoLabel}</span>}{' '}
        {item?.href && item?.textContent && <a href={item.href}>{item.textContent}</a>}
      </div>
    </div>
  );
};

/**
 * Logo button component with design system support
 * Supports both OpenForms embed and direct href configurations
 */
export const LogoButton = ({ item, headingLevel, withDesignSystem = false }: LogoButtonProps) => {
  const resolvedHeadingLevel = headingLevel || DEFAULT_HEADING_LEVEL;

  // Memoize the parsing to avoid recalculation on every render
  const openFormsData = useMemo(() => parseOpenFormsEmbed(item?.openFormsEmbed), [item?.openFormsEmbed]);

  // Compute final values once
  const finalHref = openFormsData?.href || item?.href;
  const finalTextContent = item?.textContent || openFormsData?.textContent;

  if (withDesignSystem) {
    // Only render design system version if we have required content
    if (finalHref && finalTextContent) {
      return (
        <div>
          <Heading level={resolvedHeadingLevel}>{item?.label}</Heading>
          <div className="utrecht-logo-button">
            <Icon logo={item?.logo} />
            <ButtonLink href={finalHref} appearance={kebabCase(item?.appearance) as ButtonLinkProps['appearance']}>
              {finalTextContent}
            </ButtonLink>
          </div>
        </div>
      );
    }

    // Fallback to basic rendering if missing required props
    return <BasicLogoButton item={item} headingLevel={resolvedHeadingLevel} />;
  }

  // Non-design-system version
  if (openFormsData) {
    return (
      <BasicLogoButton
        item={{
          ...item,
          href: openFormsData.href,
          textContent: item?.textContent || openFormsData.textContent,
        }}
        headingLevel={resolvedHeadingLevel}
      />
    );
  }

  return <BasicLogoButton item={item} headingLevel={resolvedHeadingLevel} />;
};

/**
 * Converts a LogoButton to static HTML string
 * Useful for server-side rendering or email generation
 */
export const convertLogoButtonToHTML = (item: LogoButtonItemType): string => {
  try {
    return renderToString(<LogoButton item={item} />);
  } catch (error) {
    // eslint-disable-next-line no-console, no-undef
    console.error('Failed to convert LogoButton to HTML:', error);
    return '';
  }
};
