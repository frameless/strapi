module.exports = {
  ckeditor5: {
    enabled: true,
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
