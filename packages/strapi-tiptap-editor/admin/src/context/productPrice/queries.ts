const gql = (query: string) => query;

export const GET_PRODUCT_PRICES = gql(`
query getProductPrices($pageId: String){
  products(filters: { uuid: { eq: $pageId } }) {
    data {
      attributes {
        uuid
        price {
          data {
            attributes {
              title
              price(pagination: { limit: 100 }) {
                id
                uuid
                currency
                label
                value
              }
            }
          }
        }
      }
    }
  }
}
`);
