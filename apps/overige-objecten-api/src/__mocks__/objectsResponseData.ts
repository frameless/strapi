export const objectsResponseData = ({ type }: { type?: 'kennisartikel' | 'vac' }) => {
  const data = {
    results: [
      {
        url: 'http://localhost:3000/api/v2/objecttypes/kennisartikel',
        uuid: 'b77a89a0-3ec2-467d-84b2-b484d5726ceb',
        upnUri: 'http://standaarden.overheid.nl/owms/terms/UPL-naam_nog_niet_beschikbaar',
        publicatieDatum: '2024-11-05',
        productAanwezig: true,
        productValtOnder: null,
        verantwoordelijkeOrganisatie: {
          url: 'http://localhost:3000/api/v2/objecttypes/kennisartikel#verantwoordelijkeOrganisatie',
          owmsIdentifier: 'http://standaarden.overheid.nl/owms/terms/Utrecht_(gemeente)',
          owmsPrefLabel: 'Gemeente Utrecht',
          owmsEndDate: '2024-11-05T23:00:00.000Z',
        },
        locaties: null,
        doelgroep: 'eu-burger',
        afdelingen: [
          {
            afdelingId: '463de311-fbe3-48d8-bd87-722de5c80b04',
            afdelingnaam: 'Demo Afdeling',
          },
        ],
        beschikbareTalen: ['nl'],
        vertalingen: [
          {
            datumWijziging: '2024-11-06T12:05:42.541Z',
            taal: 'nl',
            titel: 'Demo Product',
            trefwoorden: [{ trefwoord: 'Demo' }, { trefwoord: 'Page' }],
            vereisten: '<h2>Voorwaarden - 1</h2><p>Body text</p><p></p>',
            bewijs: '<h2>Bewijs - 1</h2><p>Body text</p>',
            bezwaarEnBeroep: '<h2>Bezwaar - 1</h2><p>Body text</p>',
            deskMemo: '',
            kostenEnBetaalmethoden: '<h2>Kosten - 1</h2><p></p>',
            procedureBeschrijving: '<h2>Aanvraag&nbsp; - 1</h2><p>Body text</p>',
            tekst: '<h2>Inleiding  - 1</h2><p>Body text</p><h2>Inleiding  - 2</h2><p>Body text</p>',
          },
        ],
      },
      {
        uuid: '22D89EB2-2238-4885-A352-07C02CF8FCDF',
        vraag: 'Wat is het proces om een paspoort aan te vragen?',
        status: 'actief',
        antwoord:
          'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
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
      {
        uuid: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
        vraag: 'Hoe kan ik een rijbewijs aanvragen?',
        status: 'actief',
        antwoord:
          'Voor het aanvragen van een rijbewijs moet u een aanvraagformulier invullen en uw identiteitsbewijs meenemen naar het gemeentehuis.',
        doelgroep: 'eu_burger',
        afdelingen: [
          {
            afdelingId: 'B97257C5-589E-4FC0-8C7E-F744649A13B7',
            afdelingnaam: 'Demo Afdeling',
          },
        ],
        toelichting: null,
        trefwoorden: [
          {
            trefwoord: 'rijbewijs',
          },
          {
            trefwoord: 'aanvraag',
          },
        ],
        url: 'http://localhost:3000/api/v2/objecttypes/vac',
      },
      {
        uuid: 'c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
        vraag: 'Wat moet ik doen bij verhuizing?',
        status: 'actief',
        antwoord: 'Bij verhuizing moet u zich binnen 5 dagen inschrijven op uw nieuwe adres bij de gemeente.',
        doelgroep: 'eu_burger',
        afdelingen: [
          {
            afdelingId: '8B2EC293-AB4D-46BA-A4FE-7B5E84772D93',
            afdelingnaam: 'Demo Afdeling',
          },
        ],
        toelichting: null,
        trefwoorden: [
          {
            trefwoord: 'verhuizing',
          },
          {
            trefwoord: 'inschrijven',
          },
        ],
        url: 'http://localhost:3000/api/v2/objecttypes/vac',
      },
    ],
  };
  switch (type) {
    case 'kennisartikel':
      return data.results.filter(({ url }) => url.endsWith('kennisartikel'));
    case 'vac':
      return data.results.filter(({ url }) => url.endsWith('vac'));
    default:
      return data;
  }
};
