import { Strapi } from '@strapi/strapi';
import { Context } from 'koa';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getProducts(ctx: Context) {
    try {
      const products = await strapi
        .plugin('content-compliance-checker')
        .service('content-compliance-checker')
        .findProductsWithNoneKennisartikelBlocks();

      ctx.body = products;
    } catch (error) {
      ctx.throw(500, error instanceof Error ? error.message : String(error));
    }
  },
  async getProductBlocks(ctx: Context) {
    try {
      const { id } = ctx.params;
      const productBlocks = await strapi
        .plugin('content-compliance-checker')
        .service('content-compliance-checker')
        .getProductBlocks(id);

      if (!productBlocks[0]) {
        ctx.notFound('Product not found');
        return;
      }
      ctx.body = productBlocks[0];
    } catch (error) {
      ctx.throw(500, error instanceof Error ? error.message : String(error));
    }
  },
  async getAdditionalInformation(ctx: Context) {
    try {
      const additionalInformation = await strapi
        .plugin('content-compliance-checker')
        .service('content-compliance-checker')
        .findAdditionalInformationWithNoneKennisartikelBlocks();

      ctx.body = additionalInformation;
    } catch (error) {
      ctx.throw(500, error instanceof Error ? error.message : String(error));
    }
  },
  async getAdditionalInformationBlocks(ctx: Context) {
    try {
      const { id } = ctx.params;
      const additionalInfo = await strapi
        .plugin('content-compliance-checker')
        .service('content-compliance-checker')
        .getAdditionalInformationBlocks(id);

      if (!additionalInfo[0]) {
        ctx.notFound('Additional information not found');
        return;
      }
      ctx.body = additionalInfo[0];
    } catch (error) {
      ctx.throw(500, error instanceof Error ? error.message : String(error));
    }
  },
});
