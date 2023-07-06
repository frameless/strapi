import { Strapi } from '@strapi/strapi';

const populateProductCreator = async ({ strapi, root }: { strapi: Strapi; root: any }) => {
  const query = strapi.db.query('api::product.product');
  const post = await query.findOne({
    where: {
      id: root?.id,
    },
    populate: ['createdBy', 'updatedBy'],
  });

  return post;
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    const extension = ({ nexus }) => {
      return {
        types: [
          nexus.objectType({
            type: 'Creator',
            name: 'Creator',
            definition(t) {
              t.int('id');
              t.string('firstname');
              t.string('lastname');
            },
          }),
          nexus.extendType({
            type: 'Product',
            definition(t) {
              t.field('createdBy', {
                type: 'Creator',
                async resolve(root) {
                  const post = await populateProductCreator({ strapi, root });
                  return {
                    id: post.createdBy?.id,
                    firstname: post.createdBy?.firstname,
                    lastname: post.createdBy?.lastname,
                  };
                },
              });
              t.field('updatedBy', {
                type: 'Creator',
                async resolve(root) {
                  const post = await populateProductCreator({ strapi, root });
                  return {
                    id: post.updatedBy?.id,
                    firstname: post.updatedBy?.firstname,
                    lastname: post.updatedBy?.lastname,
                  };
                },
              });
            },
          }),
        ],
      };
    };

    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi } */) {},
};
