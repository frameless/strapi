export const objectsResponseData = ({ type }: { type?: 'kennisartikel' | 'vac' }) => {
  const data = {
    results: [
      {
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
            trefwoorden: [{ trefwoord: 'schade' }, { trefwoord: 'aansprakelijkheid' }],
            vereisten:
              '<h2 style="text-align: start"><strong>Voorwaarden</strong></h2><ul><li><p>U kunt laten zien dat de gemeente verantwoordelijk is voor uw schade.</p></li><li><p>U hebt geen rechtsbijstandsverzekering en u bent niet verzekerd voor de schade. Denk bijvoorbeeld aan een autoverzekering, zorgverzekering, particuliere aansprakelijkheidsverzekering en telefoonverzekering. Bent u wel verzekerd? Ga dan naar uw verzekeringsmaatschappij.</p></li></ul>',
          },
        ],
      },
      {
        url: 'http://localhost:3000/api/v2/objecttypes/vac',
        uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
        vraag: 'Wat is het proces om een paspoort aan te vragen?',
        status: 'actief',
        antwoord:
          'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
        doelgroep: 'eu-burger',
      },
      {
        url: 'http://localhost:3000/api/v2/objecttypes/vac',
        uuid: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
        vraag: 'Hoe kan ik een rijbewijs aanvragen?',
        status: 'actief',
        antwoord:
          'Voor het aanvragen van een rijbewijs moet u een aanvraagformulier invullen en uw identiteitsbewijs meenemen naar het gemeentehuis.',
        doelgroep: 'eu-burger',
      },
      {
        url: 'http://localhost:3000/api/v2/objecttypes/vac',
        uuid: 'c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
        vraag: 'Wat moet ik doen bij verhuizing?',
        status: 'actief',
        antwoord: 'Bij verhuizing moet u zich binnen 5 dagen inschrijven op uw nieuwe adres bij de gemeente.',
        doelgroep: 'eu-burger',
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
