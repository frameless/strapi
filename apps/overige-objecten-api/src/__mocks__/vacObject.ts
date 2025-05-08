export const vacObject = () => ({
  type: 'http://localhost:3000/api/v2/objecttypes/vac',
  uuid: '22D89EB2-2238-4885-A352-07C02CF8FCDF',
  url: 'http://localhost:3000/api/v2/objects/22D89EB2-2238-4885-A352-07C02CF8FCDF',
  record: {
    endAt: null,
    geometry: null,
    index: 1,
    registrationAt: '2024-11-05T16:03:50.975Z',
    startAt: '2024-11-05T16:03:50.975Z',
    typeVersion: 1,
    data: {
      uuid: '22D89EB2-2238-4885-A352-07C02CF8FCDF',
      vraag: 'Wat is het proces om een paspoort aan te vragen?',
      antwoord:
        'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
      status: 'actief',
      doelgroep: 'eu-burger',
      gerelateerdeProducten: [],
      gerelateerdeVACs: [],
      afdelingen: [
        {
          afdelingId: '4DFE293E-FCDE-4913-81E5-E82F92CC8DB6',
          afdelingNaam: 'Demo Afdeling',
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
      url: 'http://localhost:3000/api/v2/objects/22D89EB2-2238-4885-A352-07C02CF8FCDF',
    },
  },
});
