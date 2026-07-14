import { ButtonGroup, ButtonLink, Heading } from '@utrecht/component-library-react';
import {
  UtrechtDigidLogo,
  UtrechtEherkenningLogo,
  UtrechtEidasLogo,
  UtrechtIconArrow,
  UtrechtLogoButton,
} from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import kebabCase from 'lodash.kebabcase';
import { ReactNode } from 'react';

import styles from './index.module.css';

export type LogoType = 'digid' | 'eherkenning' | 'eidas' | 'without_logo';
export type ButtonAppearance = 'primary-action-button' | 'secondary-action-button' | 'subtle-button' | 'magenta';

export interface LogoButtonProps {
  logo?: LogoType | null;
  appearance?: ButtonAppearance | string;
  href: string;
  children: ReactNode;
  label?: string | null;
  headingLevel?: number;
}

const css = classnames.bind(styles);

const isValidAppearance = (value: unknown): value is ButtonAppearance => {
  const validAppearances: ButtonAppearance[] = [
    'primary-action-button',
    'secondary-action-button',
    'subtle-button',
    'magenta',
  ];
  return validAppearances.includes(value as ButtonAppearance);
};

const normalizeAppearance = (appearance?: string | ButtonAppearance): ButtonAppearance => {
  if (!appearance) {
    return 'primary-action-button';
  }

  if (typeof appearance === 'string') {
    // Convert snake_case (from CMS) to kebab-case
    const normalized = kebabCase(appearance) as ButtonAppearance;
    if (isValidAppearance(normalized)) {
      return normalized;
    }
  }

  return 'primary-action-button';
};

const getButtonLinkAppearance = (appearance?: string | ButtonAppearance): Exclude<ButtonAppearance, 'magenta'> => {
  const normalized = normalizeAppearance(appearance);

  if (normalized === 'magenta') {
    return 'primary-action-button';
  }

  return normalized;
};

const shouldApplyMagentaClass = (appearance?: string | ButtonAppearance): boolean => {
  return normalizeAppearance(appearance) === 'magenta';
};

export const LogoButton = ({ logo, appearance, href, children, label, headingLevel = 3 }: LogoButtonProps) => {
  const buttonAppearance = getButtonLinkAppearance(appearance);
  const isMagenta = shouldApplyMagentaClass(appearance);

  switch (logo) {
    case 'digid':
      return (
        <>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <ButtonGroup>
            <UtrechtLogoButton>
              <UtrechtDigidLogo role="presentation" />
              <ButtonLink appearance={buttonAppearance} href={href}>
                {children} <UtrechtIconArrow />
              </ButtonLink>
            </UtrechtLogoButton>
          </ButtonGroup>
        </>
      );
    case 'eherkenning':
      return (
        <>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <ButtonGroup>
            <UtrechtLogoButton>
              <UtrechtEherkenningLogo role="presentation" />
              <ButtonLink
                appearance="primary-action-button"
                href={href}
                className={css('utrecht-button-link--magenta')}
              >
                {children} <UtrechtIconArrow />
              </ButtonLink>
            </UtrechtLogoButton>
          </ButtonGroup>
        </>
      );
    case 'eidas':
      return (
        <>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <ButtonGroup>
            <UtrechtLogoButton>
              <UtrechtEidasLogo role="presentation" />
              <ButtonLink appearance={buttonAppearance} href={href}>
                {children} <UtrechtIconArrow />
              </ButtonLink>
            </UtrechtLogoButton>
          </ButtonGroup>
        </>
      );
    case 'without_logo':
      return (
        <>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <ButtonGroup>
            <ButtonLink
              appearance={buttonAppearance}
              href={href}
              className={isMagenta ? css('utrecht-button-link--magenta') : undefined}
            >
              {children} <UtrechtIconArrow />
            </ButtonLink>
          </ButtonGroup>
        </>
      );
    default:
      return null;
  }
};
