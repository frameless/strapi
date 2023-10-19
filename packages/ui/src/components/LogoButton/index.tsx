import { ButtonGroup, ButtonLink, Heading } from '@utrecht/component-library-react/dist/css-module';
import {
  UtrechtDigidLogo,
  UtrechtEherkenningLogo,
  UtrechtEidasLogo,
  UtrechtIconArrow,
  UtrechtLogoButton,
} from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

export interface LogoButtonProps {
  logo: 'digid' | 'eherkenning' | 'eidas' | 'without_logo';
  appearance: 'primary' | 'secondary' | 'magenta';
  href: string;
  text: string;
  label: string;
  headingLevel?: number;
}
const css = classnames.bind(styles);

export const LogoButton = ({ logo, appearance, href, text, label, headingLevel = 3 }: LogoButtonProps) => {
  switch (logo) {
    case 'digid':
      return (
        <>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <ButtonGroup>
            <UtrechtLogoButton>
              <UtrechtDigidLogo />
              <ButtonLink appearance={`${appearance}-action-button`} href={href}>
                {text} <UtrechtIconArrow />
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
                {text} <UtrechtIconArrow />
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
              <ButtonLink appearance={`${appearance}-action-button`} href={href}>
                {text} <UtrechtIconArrow />
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
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text} <UtrechtIconArrow />
            </ButtonLink>
          </ButtonGroup>
        </>
      );
    default:
      return null;
  }
};
