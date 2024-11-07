export const kennisartikelObject = () => ({
  url: 'http://localhost:3000/api/v2/objecttypes/kennisartikel',
  uuid: 'a9058a3e-6dd9-480c-a074-e38026bd4ffd',
  upnUri: 'http://standaarden.overheid.nl/owms/terms/UPL-naam_nog_niet_beschikbaar',
  publicatieDatum: '2024-04-02',
  productAanwezig: true,
  productValtOnder: null,
  verantwoordelijkeOrganisatie: {
    url: 'http://localhost:3000/api/v2/objecttypes/kennisartikel#verantwoordelijkeOrganisatie',
    owmsIdentifier: 'http://standaarden.overheid.nl/owms/terms/Utrecht_(gemeente)',
    owmsPrefLabel: 'Gemeente Utrecht',
    owmsEndDate: '2024-10-13T22:00:00.000Z',
  },
  locaties: null,
  doelgroep: 'eu-burger',
  afdelingen: [
    {
      afdelingId: 'c38039ec-3079-47d1-a13c-c16fe8277b62',
      afdelingnaam: 'Demo afdeling',
    },
  ],
  beschikbareTalen: ['nl'],
  vertalingen: [
    {
      datumWijziging: '2024-10-14T09:22:27.349Z',
      taal: 'nl',
      titel: 'Aansprakelijk stellen gemeente, schade melden',
      trefwoorden: [
        {
          trefwoord: 'schade',
        },
        {
          trefwoord: 'aansprakelijkheid',
        },
      ],
      vereisten:
        '<h2 style="text-align: start"><strong>Voorwaarden</strong></h2><ul><li><p>U kunt laten zien dat de gemeente verantwoordelijk is voor uw schade.</p></li><li><p>U hebt geen rechtsbijstandsverzekering en u bent niet verzekerd voor de schade. Denk bijvoorbeeld aan een autoverzekering, zorgverzekering, particuliere aansprakelijkheidsverzekering en telefoonverzekering. Bent u wel verzekerd? Ga dan naar uw verzekeringsmaatschappij.</p></li></ul>',
    },
  ],
});
