'use client';

import classnames from 'classnames/bind';
import styles from './index.module.scss';
import {
  UtrechtIconGrofvuil,
  UtrechtIconMelding,
  UtrechtIconParkerenBetalen,
  UtrechtIconPaspoort,
  UtrechtIconRijbewijs,
  UtrechtIconVerhuizen,
} from '../icons';

const topTaskIcons = {
  paspoort: UtrechtIconPaspoort,
  melding: UtrechtIconMelding,
  verhuizen: UtrechtIconVerhuizen,
  parkeren_betalen: UtrechtIconParkerenBetalen,
  rijbewijs: UtrechtIconRijbewijs,
  grofvuil: UtrechtIconGrofvuil,
};

export type TopTaskIconsTypes = keyof typeof topTaskIcons;

type TopTaskDataTypes = {
  id: string;
  title: string;
  icon: keyof typeof topTaskIcons;
  href: string;
};

interface TopTaskProps {
  data: TopTaskDataTypes[];
}

const css = classnames.bind(styles);

export const TopTask = ({ data }: TopTaskProps) => (
  <div className={css('utrecht-toptask')}>
    {data &&
      data.length > 0 &&
      data.map(({ icon, id, title, href }) => {
        const Icon = topTaskIcons[icon];
        return (
          <div key={id} className={css('utrecht-toptask__item')}>
            <a href={href} className={css('utrecht-toptask-link')}>
              <Icon />
              <span className={css('utrecht-toptask-link__title')}>{title}</span>
            </a>
          </div>
        );
      })}
  </div>
);
