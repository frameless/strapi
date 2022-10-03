module.exports = {
  ckeditor5: {
    enabled: true,
    // resolve: "@rameless/strapi-plugin-ckeditor5",
  },
  slugify: {
    enabled: true,
    config: {
      shouldUpdateSlug: true,
      contentTypes: {
        product: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
};
