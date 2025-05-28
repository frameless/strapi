import { Strapi } from '@strapi/strapi';

type Section = {
  kennisartikelCategorie: string | null;
  [key: string]: any;
};

type Product = {
  sections?: Section[];
  [key: string]: any;
};
type ContentBlock = {
  kennisartikelCategorie: string | null;
  [key: string]: any;
};

type AdditionalInformation = {
  content?: {
    contentBlock?: ContentBlock[];
    [key: string]: any;
  };
  [key: string]: any;
};

const filterAdditionalInformationWithNoneKennisartikelBlocks = (
  additionalInformation: AdditionalInformation[],
): AdditionalInformation[] => {
  return additionalInformation.reduce<AdditionalInformation[]>((acc, info) => {
    const contentBlock = info.content?.contentBlock;
    const filteredBlocks = contentBlock?.filter((block) => block.kennisartikelCategorie === null);

    if (filteredBlocks && filteredBlocks.length > 0) {
      acc.push({
        ...info,
        content: {
          ...info.content,
          contentBlock: filteredBlocks,
        },
      });
    }

    return acc;
  }, []);
};

const filterProductsWithNoneKennisartikelBlocks = (products: Product[]): Product[] => {
  return products.reduce<Product[]>((filtered, product) => {
    const filteredSections = product.sections?.filter((section) => section.kennisartikelCategorie === null);

    if (filteredSections && filteredSections.length > 0) {
      filtered.push({
        ...product,
        sections: filteredSections,
      });
    }

    return filtered;
  }, []);
};
export default ({ strapi }: { strapi: Strapi }) => ({
  async findProductsWithNoneKennisartikelBlocks() {
    // fetch all products with their blocks
    const products = await strapi.entityService?.findMany('api::product.product', { populate: '*' });
    // filter products that have at least one block without kennisartikel category
    const filteredProducts = filterProductsWithNoneKennisartikelBlocks(products as Product[]);
    return filteredProducts;
  },
  async getProductBlocks(id: string) {
    const product = (await strapi.entityService?.findOne('api::product.product', id, {
      populate: {
        sections: {
          populate: {
            item: true,
            kennisartikelCategorie: true,
            imageData: true,
            logoButton: true,
            pdc_faq: {
              populate: {
                faq: true,
              },
            },
            column: {
              populate: {
                logoButton: true,
              },
            },
          },
        },
      },
    })) as Product | null;
    if (!product) {
      return null;
    }

    const filteredSections = filterProductsWithNoneKennisartikelBlocks([product]);
    return filteredSections;
  },
  async findAdditionalInformationWithNoneKennisartikelBlocks() {
    // fetch all additional information with their blocks
    const additionalInformation = await strapi.entityService?.findMany(
      'api::additional-information.additional-information',
      {
        populate: {
          content: {
            populate: {
              contentBlock: true,
            },
          },
        },
      },
    );
    const filteredAdditionalInformation = filterAdditionalInformationWithNoneKennisartikelBlocks(
      additionalInformation as AdditionalInformation[],
    );
    return filteredAdditionalInformation;
  },
  async getAdditionalInformationBlocks(id: string) {
    const additionalInfo = await strapi.entityService?.findOne(
      'api::additional-information.additional-information',
      id,
      {
        populate: {
          content: {
            populate: {
              contentBlock: true,
            },
          },
        },
      },
    );

    const filteredAdditionalInfo = filterAdditionalInformationWithNoneKennisartikelBlocks([
      additionalInfo,
    ] as AdditionalInformation[]);
    return filteredAdditionalInfo;
  },
});
