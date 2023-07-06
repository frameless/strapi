'use strict';

/**
 * product controller
 */

import { factories } from '@strapi/strapi';

const createCoreController = factories.createCoreController;

export default createCoreController('api::product.product', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    const query = strapi.db.query('api::product.product');
    await Promise.all(
      data.map(async (item: any, index: number) => {
        const foundItem = await query.findOne({
          where: {
            id: item.id,
          },
          populate: ['createdBy', 'updatedBy'],
        });
        data[index].attributes.createdBy.data = {
          id: foundItem.createdBy?.id,
          firstname: foundItem.createdBy?.firstname,
          lastname: foundItem.createdBy?.lastname,
        };
        data[index].attributes.updatedBy = {
          id: foundItem.updatedBy?.id,
          firstname: foundItem.updatedBy?.firstname,
          lastname: foundItem.updatedBy?.lastname,
        };
      }),
    );
    return { data, meta };
  },
}));
