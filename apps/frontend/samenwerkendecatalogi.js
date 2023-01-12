const fs = require('fs');
const { convertJsonToXML } = require('@frameless/samenwerkende-catalogi/src/index');
const axios = require('axios');
const env = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development';

require('dotenv').config({ path: `./.env.${env}.local` });

const createSWC = async (url) => {
  try {
    const { data } = await axios({
      url,
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
    const xml = convertJsonToXML(data.data.products.data, url);
    fs.writeFileSync('./public/samenwerkendecatalogi.xml', xml);
  } catch (error) {
    console.log(error);
  }
};
createSWC(process.env.STRAPI_FRONTEND_URL || 'https://example.com/');
