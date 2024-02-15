import { Heading } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { kebabCase } from 'lodash';
import styles from './index.module.scss';
import { Grid, GridCell } from '../Grid';
import { LogoButton, LogoButtonProps } from '../LogoButton';

export type Columns = {
  title?: string;
  logoButton: LogoButtonProps[];
};
export interface MultiColumnsButtonProps {
  columns: Columns[];
}

const css = classnames.bind(styles);

export const MultiColumnsButton = ({ columns }: MultiColumnsButtonProps) => (
  <Grid spacing="md" className={css('utrecht-multi-columns-button')}>
    {columns &&
      columns.length > 0 &&
      columns.map(({ logoButton, title }, index: number) => (
        <GridCell key={index} sm={6} className={css('utrecht-multi-columns-button__item')}>
          <Heading level={3}>{title}</Heading>
          {logoButton &&
            logoButton.length > 0 &&
            logoButton.map((item: any, index: number) => (
              <LogoButton
                headingLevel={title ? 4 : 3}
                key={index}
                href={item.href}
                appearance={kebabCase(item.appearance)}
                label={item.label}
                logo={item.logo}
              >
                {item.textContent}
              </LogoButton>
            ))}
        </GridCell>
      ))}
  </Grid>
);
