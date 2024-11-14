export const getStrapiVacData = () => {
  return {
    data: {
      vacs: {
        meta: {
          pagination: {
            total: 3,
            page: 1,
            pageSize: 1,
            pageCount: 1,
          },
        },
        data: [
          {
            id: '1',
            attributes: {
              createdAt: '2024-11-05T16:03:50.975Z',
              updatedAt: '2024-11-05T16:03:50.975Z',
              vac: {
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
              },
            },
          },
          {
            id: '2',
            attributes: {
              createdAt: '2024-11-05T16:03:50.975Z',
              updatedAt: '2024-11-05T16:03:50.975Z',
              vac: {
                uuid: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
                vraag: 'Hoe kan ik een rijbewijs aanvragen?',
                antwoord:
                  'Voor het aanvragen van een rijbewijs moet u een aanvraagformulier invullen en uw identiteitsbewijs meenemen naar het gemeentehuis.',
                status: 'actief',
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
              },
            },
          },
          {
            id: '3',
            attributes: {
              createdAt: '2024-11-05T16:03:50.975Z',
              updatedAt: '2024-11-05T16:03:50.975Z',
              vac: {
                uuid: 'c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
                vraag: 'Wat moet ik doen bij verhuizing?',
                antwoord: 'Bij verhuizing moet u zich binnen 5 dagen inschrijven op uw nieuwe adres bij de gemeente.',
                status: 'actief',
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
              },
            },
          },
        ],
      },
    },
  };
};
