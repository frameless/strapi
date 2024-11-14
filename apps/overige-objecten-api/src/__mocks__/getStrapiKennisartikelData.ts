export const getStrapiKennisartikelData = () => {
  return {
    data: {
      products: {
        meta: {
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
            pageCount: 1,
          },
        },
        data: [
          {
            id: '1',
            attributes: {
              title: 'Demo Product',
              slug: 'demo-product',
              uuid: 'b77a89a0-3ec2-467d-84b2-b484d5726ceb',
              locale: 'nl',
              updatedAt: '2024-11-06T12:05:42.541Z',
              createdAt: '2024-11-05T16:03:50.975Z',
              metaTags: {
                keymatch: 'Demo, Page',
                title: 'Demo Page Title',
                description: 'Demo Page description',
              },
              sections: [
                {
                  id: '1',
                  content: '<h2>Inleiding  - 1</h2><p>Body text</p>',
                  kennisartikelCategorie: 'inleiding',
                  component: 'ComponentComponentsUtrechtRichText',
                },
                {
                  id: '2',
                  content: '<h2>Inleiding  - 2</h2><p>Body text</p>',
                  kennisartikelCategorie: 'inleiding',
                  component: 'ComponentComponentsUtrechtRichText',
                },
                {
                  id: '3',
                  content: '<h2>Aanvraag&nbsp; - 1</h2><p>Body text</p>',
                  kennisartikelCategorie: 'aanvraag',
                  component: 'ComponentComponentsUtrechtRichText',
                },
                {
                  id: '4',
                  content: '<h2>Bewijs - 1</h2><p>Body text</p>',
                  kennisartikelCategorie: 'bewijs',
                  component: 'ComponentComponentsUtrechtRichText',
                },
                {
                  id: '5',
                  content: '<h2>Voorwaarden - 1</h2><p>Body text</p><p></p>',
                  kennisartikelCategorie: 'voorwaarden',
                  component: 'ComponentComponentsUtrechtRichText',
                },
                {
                  id: '6',
                  content: '<h2>Bezwaar - 1</h2><p>Body text</p>',
                  kennisartikelCategorie: 'bezwaar',
                  component: 'ComponentComponentsUtrechtRichText',
                },
                {
                  id: '7',
                  content: '<h2>Kosten - 1</h2><p></p>',
                  kennisartikelCategorie: 'kosten',
                  component: 'ComponentComponentsUtrechtRichText',
                },
                {
                  component: 'ComponentComponentsInternalBlockContent',
                  internal_field: {
                    data: {
                      attributes: {
                        content: {
                          uuid: 'e51318b2-ddb3-4e85-b746-5f29f3762a82',
                          contentBlock: [
                            {
                              content: '<h2>Inleiding- 2 - internal</h2><p>Body tekst</p>',
                              kennisartikelCategorie: 'inleiding',
                            },
                            {
                              content: '<h2>Inleiding - internal</h2><p>Body tekst</p>',
                              kennisartikelCategorie: 'inleiding',
                            },
                            {
                              content: '<h2>Aanvraag - internal</h2><p>Body tekst</p>',
                              kennisartikelCategorie: 'aanvraag',
                            },
                            {
                              content: '<h2>Bewijs - internal</h2><p>body tekst</p>',
                              kennisartikelCategorie: 'bewijs',
                            },
                            {
                              content: '<h2>Voorwaarden - internal</h2><p>body tekst</p>',
                              kennisartikelCategorie: 'voorwaarden',
                            },
                            {
                              content: '<h2>Bezwaar - internal</h2><p>body tekst</p>',
                              kennisartikelCategorie: 'bezwaar',
                            },
                            {
                              content: '<h2>Kosten - internal&nbsp;</h2><p>body tekst</p>',
                              kennisartikelCategorie: 'kosten',
                            },
                            {
                              content: '<h2>Termijn - internal&nbsp;</h2><p>body tekst</p>',
                              kennisartikelCategorie: 'termijn',
                            },
                            {
                              content: '<h2>Wat te doen bij geen reactie - internal</h2><p>body tekst</p>',
                              kennisartikelCategorie: 'wat_te_doen_bij_geen_reactie',
                            },
                            {
                              content: '<h2>Bijzonderheden - internal</h2><p>Body tekst</p><p></p>',
                              kennisartikelCategorie: 'bijzonderheden',
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              ],
              kennisartikelMetadata: {
                uuid: 'c81023c8-3653-4ce3-90c0-eee9f7a9336f',
                doelgroep: 'eu_burger',
                productAanwezig: true,
                productValtOnder: null,
                afdelingen: [
                  {
                    afdelingId: '463de311-fbe3-48d8-bd87-722de5c80b04',
                    afdelingnaam: 'Demo Afdeling',
                  },
                ],
                verantwoordelijkeOrganisatie: {
                  owmsIdentifier: 'http://standaarden.overheid.nl/owms/terms/Utrecht_(gemeente)',
                  owmsPrefLabel: 'Gemeente Utrecht',
                  owmsEndDate: '2024-11-05T23:00:00.000Z',
                },
                upnUri: 'http://standaarden.overheid.nl/owms/terms/UPL-naam_nog_niet_beschikbaar',
              },
            },
          },
        ],
      },
    },
  };
};
