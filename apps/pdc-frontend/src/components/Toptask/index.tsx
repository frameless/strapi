'use client';

import classnames from 'classnames/bind';
import styles from './index.module.scss';
import {
  UtrechtIconGrofvuilOphalen,
  UtrechtIconMelding,
  UtrechtIconNummerbord,
  UtrechtIconPaspoort,
  UtrechtIconRijbewijs,
  UtrechtIconVerhuizen,
} from '../index';
import { Grid, GridCell } from '../index';

const icon = {
  paspoort: UtrechtIconPaspoort,
  melding: UtrechtIconMelding,
  verhuizen: UtrechtIconVerhuizen,
  nummerbord: UtrechtIconNummerbord,
  rijbewijs: UtrechtIconRijbewijs,
  grofvuil_ophalen: UtrechtIconGrofvuilOphalen,
};
export type TopTaskIconsTypes = keyof typeof icon;

export type TopTaskDataTypes = {
  id: string;
  textContent: string;
  topTaskIcons: keyof typeof icon;
  href: string;
};

interface TopTaskProps {
  data: TopTaskDataTypes[];
}

const css = classnames.bind(styles);

export const TopTask = ({ data }: TopTaskProps) => (
  <Grid className={css('utrecht-toptask')} spacing="sm">
    {data &&
      data.length > 0 &&
      data.map(({ topTaskIcons, id, textContent, href }) => {
        const Icon = icon[topTaskIcons];

        return (
          <GridCell key={id} md={4} sm={6} lg={4}>
            <a href={href} className={css('utrecht-toptask-link')}>
              <Icon />
              <span className={css('utrecht-toptask-link__title')}>{textContent}</span>
            </a>
          </GridCell>
        );
      })}
  </Grid>
);
