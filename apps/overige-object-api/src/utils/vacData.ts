import { components } from '../types/openapi';

export type VACType = components['schemas']['vac'] & { uuid: string };
export const vacData = ({ url }: any): VACType[] => [
  {
    url,
    uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    vraag: 'Wat is het proces om een paspoort aan te vragen?',
    status: 'actief',
    antwoord:
      'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
    doelgroep: 'eu-burger',
  },
  {
    url,
    uuid: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
    vraag: 'Hoe kan ik een rijbewijs aanvragen?',
    status: 'actief',
    antwoord:
      'Voor het aanvragen van een rijbewijs moet u een aanvraagformulier invullen en uw identiteitsbewijs meenemen naar het gemeentehuis.',
    doelgroep: 'eu-burger',
  },
  {
    url,
    uuid: 'c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
    vraag: 'Wat moet ik doen bij verhuizing?',
    status: 'actief',
    antwoord: 'Bij verhuizing moet u zich binnen 5 dagen inschrijven op uw nieuwe adres bij de gemeente.',
    doelgroep: 'eu-burger',
  },
];
