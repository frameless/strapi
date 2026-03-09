import { Heading } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { ReactNode } from 'react';

import { Grid, GridCell } from '../Grid';
import { LogoButton, LogoButtonProps } from '../LogoButton';

import styles from './index.module.scss';

export type Columns = {
  title?: string;
  logoButton: Array<LogoButtonProps & { openFormsEmbed?: string; textContent?: ReactNode }>;
};

export interface MultiColumnsButtonProps {
  columns: Columns[];
}

const css = classnames.bind(styles);

export const MultiColumnsButton = ({ columns }: MultiColumnsButtonProps) => (
  <Grid spacing="md" className={css('utrecht-multi-columns-button')}>
    {columns &&
      columns.length > 0 &&
      columns.map(({ logoButton, title }, columnIndex: number) => (
        <GridCell key={columnIndex} sm={6} className={css('utrecht-multi-columns-button__item')}>
          {title && <Heading level={3}>{title}</Heading>}
          {logoButton &&
            logoButton.length > 0 &&
            logoButton.map((item, itemIndex: number) => {
              if (item.openFormsEmbed) {
                const parsOpenFormsEmbedData = new URLSearchParams(item.openFormsEmbed);
                const slug = parsOpenFormsEmbedData.get('slug');
                const uuid = parsOpenFormsEmbedData.get('uuid');
                const label = parsOpenFormsEmbedData.get('label');

                return (
                  <LogoButton
                    headingLevel={title ? 4 : 3}
                    key={uuid || itemIndex}
                    appearance={item?.appearance}
                    label={item.label}
                    logo={item.logo}
                    href={`/form/${slug}`}
                  >
                    {item.textContent || label}
                  </LogoButton>
                );
              }

              return (
                <LogoButton
                  headingLevel={title ? 4 : 3}
                  key={itemIndex}
                  href={item.href}
                  appearance={item.appearance}
                  label={item.label}
                  logo={item.logo}
                >
                  {item.textContent}
                </LogoButton>
              );
            })}
        </GridCell>
      ))}
  </Grid>
);
