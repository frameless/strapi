const fs = require('fs');
const { convertJsonToXML } = require('@frameless/samenwerkende-catalogi/src/index');
const axios = require('axios');

// TODO make a separated node app

const createSWC = async () => {
  try {
    const { data } = await axios({
      url: 'http://strapi:1337/graphql', // FIXME use env variable instead of hardcoded urls (process.env.STRAPI_BACKEND_URL)
      method: 'post',
      data: {
        query: `
              {
                products(locale: "nl"){
                  data {
                    id
                    attributes {
                      title
                      excerpt
                      slug
                      locale
                      updatedAt
                      catalogiMeta {
                        spatial {
                          scheme
                          resourceIdentifier
                        }
                        authority {
                          scheme
                          resourceIdentifier
                        }
                        audience{
                          id
                          type
                        }
                        onlineRequest{
                          type
                        }
                      }
                    }
                  }
                }
              }
            `,
      },
    });
    const xml = convertJsonToXML(data?.data?.products?.data, 'http://0.0.0.0:3000/'); // FIXME use env variable instead of hardcoded urls process.env.STRAPI_FRONTEND_URL
    fs.writeFileSync('./public/samenwerkendecatalogi.xml', xml);
  } catch (error) {
    console.error(error);
  }
};
createSWC();
