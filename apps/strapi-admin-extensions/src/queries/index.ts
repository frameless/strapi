const gql = (query: any) => query;

export const CREATE_VAC = gql(`
  mutation createVac($data: VacInput!) {
  createVac(data: $data){
    data {
      id
      attributes {
        createdAt
        publishedAt
        vac {
          id
          vraag
          antwoord(pagination: { start: 0, limit: -1 }) { 
            content
            kennisartikelCategorie
          }
          status
          doelgroep
          uuid
          toelichting
          afdelingen {
            afdelingId
            afdelingNaam
          }
          trefwoorden {
             id
            trefwoord
          }
        }
      }
    }
  }
}
`);
