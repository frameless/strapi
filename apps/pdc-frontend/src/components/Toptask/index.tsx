'use client';

import classnames from 'classnames/bind';
import styles from './index.module.scss';
import {
  UtrechtIconAfspraakMaken,
  UtrechtIconAfval,
  UtrechtIconBewijsstukken,
  UtrechtIconGrofvuil,
  UtrechtIconGrofvuilOphalen,
  UtrechtIconHulpverlening,
  UtrechtIconInformatie,
  UtrechtIconKalender,
  UtrechtIconKlachten,
  UtrechtIconKroon,
  UtrechtIconMelding,
  UtrechtIconMeldingKlacht,
  UtrechtIconNummerbord,
  UtrechtIconParkeervergunning,
  UtrechtIconParkeren,
  UtrechtIconParkerenBetalen,
  UtrechtIconPaspoort,
  UtrechtIconRijbewijs,
  UtrechtIconSchildGemeenteUtrecht,
  UtrechtIconSubsidie,
  UtrechtIconVerhuizen,
  UtrechtIconWerkzaamheden,
} from '../index';
import { Grid, GridCell } from '../index';

const icon = {
  afspraak_maken: UtrechtIconAfspraakMaken,
  afval: UtrechtIconAfval,
  bewijsstukken: UtrechtIconBewijsstukken,
  grofvuil_ophalen: UtrechtIconGrofvuilOphalen,
  grofvuil: UtrechtIconGrofvuil,
  hulpverlening: UtrechtIconHulpverlening,
  informatie: UtrechtIconInformatie,
  kalender: UtrechtIconKalender,
  klachten: UtrechtIconKlachten,
  kroon: UtrechtIconKroon,
  melding_klacht: UtrechtIconMeldingKlacht,
  melding: UtrechtIconMelding,
  nummerbord: UtrechtIconNummerbord,
  parkeervergunning: UtrechtIconParkeervergunning,
  parkeren_betalen: UtrechtIconParkerenBetalen,
  parkeren: UtrechtIconParkeren,
  paspoort: UtrechtIconPaspoort,
  rijbewijs: UtrechtIconRijbewijs,
  schild_gemeente_utrecht: UtrechtIconSchildGemeenteUtrecht,
  subsidie: UtrechtIconSubsidie,
  verhuizen: UtrechtIconVerhuizen,
  werkzaamheden: UtrechtIconWerkzaamheden,
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
