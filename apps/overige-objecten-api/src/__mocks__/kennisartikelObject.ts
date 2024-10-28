export const kennisartikelObject = () => ({
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
});
