'use strict';

const { getService } = require('../util');

module.exports = {
  async config(ctx) {
    try {
      const config = await getService('plugin').getConfig();
      ctx.body = config;
    } catch (error) {
      ctx.badRequest('Something went wrong with the Preview button config');
    }
  },

  async getAdditionalInformationData(ctx) {
    try {
      const { id } = ctx.params;
      const { uid } = ctx.query;

      if (!id || !uid) {
        return ctx.badRequest('Missing id or uid parameter');
      }

      const entry = await strapi.entityService.findOne(uid, id, {
        populate: {
          product: {
            populate: {
              price: {
                populate: {
                  price: { populate: '*' },
                },
              },
            },
          },
          content: { populate: { contentBlock: { populate: '*' } } },
        },
      });

      ctx.body = {
        data: {
          ...entry,
          contentBlock: entry.content?.contentBlock || [],
        },
      };
    } catch (error) {
      ctx.badRequest('Failed to fetch additional information data', { error: error.message });
    }
  },

  async getInternalFieldData(ctx) {
    try {
      const { id } = ctx.params;
      const { uid } = ctx.query;

      if (!id || !uid) {
        return ctx.badRequest('Missing id or uid parameter');
      }

      const entry = await strapi.entityService.findOne(uid, id, {
        populate: {
          product: { populate: { price: { populate: '*' } } },
          content: { populate: { contentBlock: { populate: '*' } } },
          contact_information_internal: { populate: { contentBlock: { populate: '*' } } },
          contact_information_public: { populate: { contentBlock: { populate: '*' } } },
        },
      });
      const mergedContactInformationInternal = entry?.contact_information_internal?.flatMap(
        (item) => item?.contentBlock,
      );
      // Merge contact information with content
      const mergedData = [
        ...(entry.content?.contentBlock || []),
        ...(entry.contact_information_public?.contentBlock || []),
        ...(mergedContactInformationInternal || []),
      ];

      ctx.body = {
        data: {
          ...entry,
          mergedContent: mergedData,
        },
      };
    } catch (error) {
      ctx.badRequest('Failed to fetch internal-field data', { error: error.message });
    }
  },

  async getVacData(ctx) {
    try {
      const { id } = ctx.params;
      const { uid } = ctx.query;

      if (!id || !uid) {
        return ctx.badRequest('Missing id or uid parameter');
      }

      const entry = await strapi.entityService.findOne(uid, id, {
        populate: {
          vac: { populate: '*' },
          contact_information_internal: { populate: { contentBlock: { populate: '*' } } },
          contact_information_public: { populate: { contentBlock: { populate: '*' } } },
        },
      });

      const mergedContactInformationInternal = entry?.contact_information_internal?.flatMap(
        (item) => item?.contentBlock,
      );

      // Merge contact information with VAC antwoord
      const mergedData = [
        ...(entry.vac?.antwoord || []),
        ...(entry.contact_information_public?.contentBlock || []),
        ...(mergedContactInformationInternal || []),
      ];

      ctx.body = {
        data: {
          ...entry,
          mergedContent: mergedData,
        },
      };
    } catch (error) {
      ctx.badRequest('Failed to fetch VAC data', { error: error.message });
    }
  },

  async getProductData(ctx) {
    try {
      const { id } = ctx.params;
      const { uid } = ctx.query;

      if (!id || !uid) {
        return ctx.badRequest('Missing id or uid parameter');
      }

      const entry = await strapi.entityService.findOne(uid, id, {
        populate: {
          sections: {
            populate: {
              internal_field: {
                populate: {
                  content: { populate: '*' },
                  contact_information_internal: { populate: { contentBlock: { populate: '*' } } },
                  contact_information_public: { populate: { contentBlock: { populate: '*' } } },
                },
              },
              contact_information_public: {
                populate: { contentBlock: { populate: '*' } },
              },
            },
          },
          price: { populate: '*' },
          additional_information: {
            populate: {
              content: { populate: { contentBlock: { populate: '*' } } },
            },
          },
        },
      });

      // Process sections
      let processedSections = entry.sections || [];
      let internalFieldData = null;

      // Process sections: merge contact info in internal_field and handle contact_information_public
      processedSections = processedSections.flatMap((section) => {
        // Handle internal-block-content
        if (section.__component === 'components.internal-block-content' && section.internal_field) {
          const internalField = section.internal_field;
          const mergedContactInformationInternal = internalField.contact_information_internal?.flatMap(
            (item) => item?.contentBlock,
          );
          const mergedContentBlock = [
            ...(internalField.content?.contentBlock || []),
            ...(internalField.contact_information_public?.contentBlock || []),
            ...(mergedContactInformationInternal || []),
          ];
          // Store internal field data for later
          internalFieldData = {
            content: mergedContentBlock,
          };

          return {
            ...section,
            internal_field: {
              ...internalField,
              content: {
                ...internalField.content,
                contentBlock: mergedContentBlock,
              },
            },
          };
        }

        // Handle contact-information-public component - flatten contentBlock into individual items
        if (section.__component === 'components.contact-information-public' && section.contact_information_public) {
          const contentBlocks = section.contact_information_public.contentBlock || [];
          // Return array of flattened items as utrecht-rich-text so client processProductData handles them
          return contentBlocks.map((block) => ({
            __component: 'components.utrecht-rich-text',
            id: block.id,
            content: block.content,
            kennisartikelCategorie: 'contact',
            label: block.label,
          }));
        }

        return section;
      });

      // Flatten any nested arrays (from contact_information_public transformation)
      processedSections = processedSections.flat();

      // Prepend content field as first section
      if (entry.content) {
        processedSections = [
          {
            content: entry.content,
            kennisartikelCategorie: 'inleiding',
            __component: 'components.utrecht-rich-text',
          },
          ...processedSections,
        ];
      }

      ctx.body = {
        data: {
          ...entry,
          sections: processedSections,
          internalFieldData,
        },
      };
    } catch (error) {
      ctx.badRequest('Failed to fetch product data', { error: error.message });
    }
  },
};
