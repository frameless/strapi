export const vacObject = () => [
  {
    uuid: '22D89EB2-2238-4885-A352-07C02CF8FCDF',
    vraag: 'Wat is het proces om een paspoort aan te vragen?',
    antwoord:
      'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
    status: 'actief',
    doelgroep: 'eu_burger',
    afdelingen: [
      {
        afdelingId: '4DFE293E-FCDE-4913-81E5-E82F92CC8DB6',
        afdelingnaam: 'Demo Afdeling',
      },
    ],
    toelichting: null,
    trefwoorden: [
      {
        trefwoord: 'paspoort',
      },
      {
        trefwoord: 'aanvraag',
      },
    ],
    url: 'http://localhost:3000/api/v2/objecttypes/vac',
  },
];
