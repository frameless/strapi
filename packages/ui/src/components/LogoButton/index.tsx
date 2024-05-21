import { ButtonGroup, ButtonLink, ButtonProps, Heading } from '@utrecht/component-library-react';
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
import styles from './index.module.scss';

export type LogoType = 'digid' | 'eherkenning' | 'eidas' | 'without_logo';
export interface LogoButtonProps {
  logo?: LogoType | null;
  appearance?: ButtonProps['appearance'];
  href: string;
  children: ReactNode;
  label?: string | null;
  headingLevel?: number;
}
const css = classnames.bind(styles);

export const LogoButton = ({ logo, appearance, href, children, label, headingLevel = 3 }: LogoButtonProps) => {
  const magenta = appearance === 'magenta';
  switch (logo) {
    case 'digid':
      return (
        <>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <ButtonGroup>
            <UtrechtLogoButton>
              <UtrechtDigidLogo role="presentation" />
              <ButtonLink appearance={kebabCase(appearance)} href={href}>
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
              <UtrechtEherkenningLogo />
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
              <UtrechtEidasLogo />
              <ButtonLink appearance={kebabCase(appearance)} href={href}>
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
              appearance={magenta ? 'primary-action-button' : kebabCase(appearance)}
              href={href}
              className={magenta ? css('utrecht-button-link--magenta') : undefined}
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
