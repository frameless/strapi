import { Heading } from '@utrecht/component-library-react/dist/css-module';
import classnames from 'classnames/bind';
import styles from './index.module.scss';
import { LogoButton, LogoButtonProps } from '../LogoButton';

interface MultiColumnsButtonProps {
  columns: {
    title?: string;
    logoButton: LogoButtonProps[];
  }[];
}

const css = classnames.bind(styles);

export const MultiColumnsButton = ({ columns }: MultiColumnsButtonProps) => (
  <div className={css('utrecht-multi-columns-button')}>
    {columns &&
      columns.length > 0 &&
      columns.map(({ logoButton, title }, index: number) => (
        <div key={index} className={css('utrecht-multi-columns-button__item')}>
          <Heading level={3}>{title}</Heading>
          {logoButton &&
            logoButton.length > 0 &&
            logoButton.map((item: any, index: number) => (
              <LogoButton
                headingLevel={title ? 4 : 3}
                key={index}
                href={item.href}
                text={item.text}
                appearance={item.logo_button_appearance}
                label={item.label}
                logo={item.logo}
              />
            ))}
        </div>
      ))}
  </div>
);