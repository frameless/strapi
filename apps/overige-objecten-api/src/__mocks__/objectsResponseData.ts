export const objectsResponseData = ({ type }: { type?: 'kennisartikel' | 'vac' }) => {
  const data = {
    results: [
      {
        type: 'http://localhost:3000/api/v2/objecttypes/kennisartikel',
        url: 'http://localhost:3000/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ceb',
        uuid: 'b77a89a0-3ec2-467d-84b2-b484d5726ceb',
        record: {
          endAt: null,
          geometry: null,
          index: 1,
          registrationAt: '2024-11-05T16:03:50.975Z',
          startAt: '2024-11-05T16:03:50.975Z',
          typeVersion: 3,
          data: {
            url: 'http://localhost:3000/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ceb',
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
                deskMemo:
                  '<h2>Inleiding- 2 - internal</h2><p>Body tekst</p><h2>Inleiding - internal</h2><p>Body tekst</p><h2>Aanvraag - internal</h2><p>Body tekst</p><h2>Bewijs - internal</h2><p>body tekst</p><h2>Voorwaarden - internal</h2><p>body tekst</p><h2>Bezwaar - internal</h2><p>body tekst</p><h2>Kosten - internal&nbsp;</h2><p>body tekst</p><h2>Termijn - internal&nbsp;</h2><p>body tekst</p><h2>Wat te doen bij geen reactie - internal</h2><p>body tekst</p><h2>Bijzonderheden - internal</h2><p>Body tekst</p><p></p>',
                kostenEnBetaalmethoden: '<h2>Kosten - 1</h2><p></p>',
                procedureBeschrijving: '<h2>Aanvraag&nbsp; - 1</h2><p>Body text</p>',
                tekst: '<h2>Inleiding  - 1</h2><p>Body text</p><h2>Inleiding  - 2</h2><p>Body text</p>',
              },
            ],
          },
        },
      },
      {
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
            url: 'http://localhost:3000/api/v2/objects/22D89EB2-2238-4885-A352-07C02CF8FCDF',
          },
        },
      },
      {
        type: 'http://localhost:3000/api/v2/objecttypes/vac',
        uuid: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
        url: 'http://localhost:3000/api/v2/objects/b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
        record: {
          endAt: null,
          geometry: null,
          index: 2,
          registrationAt: '2024-11-05T16:03:50.975Z',
          startAt: '2024-11-05T16:03:50.975Z',
          typeVersion: 1,
          data: {
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
            url: 'http://localhost:3000/api/v2/objects/b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
          },
        },
      },
      {
        type: 'http://localhost:3000/api/v2/objecttypes/vac',
        uuid: 'c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
        url: 'http://localhost:3000/api/v2/objects/c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
        record: {
          endAt: null,
          geometry: null,
          index: 3,
          registrationAt: '2024-11-05T16:03:50.975Z',
          startAt: '2024-11-05T16:03:50.975Z',
          typeVersion: 1,
          data: {
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
            url: 'http://localhost:3000/api/v2/objects/c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
          },
        },
      },
    ],
  };
  switch (type) {
    case 'kennisartikel':
      return { results: data.results.filter(({ type }) => type.endsWith('kennisartikel')) };
    case 'vac':
      return { results: data.results.filter(({ type }) => type.endsWith('vac')) };
    default:
      return data;
  }
};
