import { ButtonLink, Heading } from '@utrecht/component-library-react/dist/css-module';
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
        <div className={css('utrecht-logo-button', 'utrecht-logo-button--logo')}>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <UtrechtLogoButton>
            <UtrechtDigidLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text} <UtrechtIconArrow />
            </ButtonLink>
          </UtrechtLogoButton>
        </div>
      );
    case 'eherkenning':
      return (
        <div className={css('utrecht-logo-button', 'utrecht-logo-button--logo')}>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <UtrechtLogoButton>
            <UtrechtEherkenningLogo />
            <ButtonLink appearance="primary-action-button" href={href} className={css('utrecht-button-link--magenta')}>
              {text} <UtrechtIconArrow />
            </ButtonLink>
          </UtrechtLogoButton>
        </div>
      );
    case 'eidas':
      return (
        <div className={css('utrecht-logo-button', 'utrecht-logo-button--logo')}>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <UtrechtLogoButton>
            <UtrechtEidasLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text} <UtrechtIconArrow />
            </ButtonLink>
          </UtrechtLogoButton>
        </div>
      );
    case 'without_logo':
      return (
        <div className={css('utrecht-logo-button', 'utrecht-logo-button--without-logo')}>
          {label && <Heading level={headingLevel}>{label}</Heading>}
          <ButtonLink appearance={`${appearance}-action-button`} href={href}>
            {text} <UtrechtIconArrow />
          </ButtonLink>
        </div>
      );
    default:
      return null;
  }
};
