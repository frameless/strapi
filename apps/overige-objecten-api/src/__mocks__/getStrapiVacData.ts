import type { GetAllVacItemsQuery } from '../../gql/graphql';

type VacNode = NonNullable<NonNullable<GetAllVacItemsQuery['vacs_connection']>['nodes'][number]>;

interface GetStrapiVACData {
  contact_information_internal?: VacNode['contact_information_internal'];
  contact_information_public?: VacNode['contact_information_public'];
}

export const getStrapiVacData = (params: GetStrapiVACData = {}) => {
  const { contact_information_internal = [], contact_information_public = null } = params;

  return {
    data: {
      vacs_connection: {
        pageInfo: {
          total: 3,
          page: 1,
          pageSize: 1,
          pageCount: 1,
        },
        nodes: [
          {
            id: 'u67j77h2qj6svmbmn6a5k04p',
            createdAt: '2024-11-05T16:03:50.975Z',
            updatedAt: '2024-11-05T16:03:50.975Z',
            title: 'Wat is het proces om een paspoort aan te vragen?',
            contact_information_internal,
            contact_information_public,
            vac: {
              uuid: '22D89EB2-2238-4885-A352-07C02CF8FCDF',
              antwoord: [
                {
                  content:
                    'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
                  kennisartikelCategorie: null,
                },
              ],
              status: 'actief',
              doelgroep: 'eu_burger',
              afdelingen: [
                {
                  afdelingId: '4DFE293E-FCDE-4913-81E5-E82F92CC8DB6',
                  afdelingNaam: 'Demo Afdeling',
                },
              ],
              toelichting: '',
              keywords: 'paspoort, aanvraag',
            },
          },
          {
            id: 'kw8dvw1wg290heyrtpfo1b0f',
            createdAt: '2024-11-05T16:03:50.975Z',
            updatedAt: '2024-11-05T16:03:50.975Z',
            title: 'Hoe kan ik een rijbewijs aanvragen?',
            contact_information_internal: [],
            contact_information_public,
            vac: {
              uuid: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
              antwoord: [
                {
                  content:
                    'Voor het aanvragen van een rijbewijs moet u een aanvraagformulier invullen en uw identiteitsbewijs meenemen naar het gemeentehuis.',
                  kennisartikelCategorie: null,
                },
              ],
              status: 'actief',
              doelgroep: 'eu_burger',
              afdelingen: [
                {
                  afdelingId: 'B97257C5-589E-4FC0-8C7E-F744649A13B7',
                  afdelingNaam: 'Demo Afdeling',
                },
              ],
              toelichting: '',
              keywords: 'rijbewijs, aanvraag',
            },
          },
          {
            id: 'fa7mc2gddmvhoomg4vw3e9d1',
            createdAt: '2024-11-05T16:03:50.975Z',
            updatedAt: '2024-11-05T16:03:50.975Z',
            title: 'Wat moet ik doen bij verhuizing?',
            contact_information_internal: [],
            contact_information_public,
            vac: {
              uuid: 'c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
              antwoord: [
                {
                  content: 'Bij verhuizing moet u zich binnen 5 dagen inschrijven op uw nieuwe adres bij de gemeente.',
                  kennisartikelCategorie: null,
                },
              ],
              status: 'actief',
              doelgroep: 'eu_burger',
              afdelingen: [
                {
                  afdelingId: '8B2EC293-AB4D-46BA-A4FE-7B5E84772D93',
                  afdelingNaam: 'Demo Afdeling',
                },
              ],
              toelichting: '',
              keywords: 'verhuizing, inschrijven',
            },
          },
        ],
      },
    } as GetAllVacItemsQuery,
  };
};
