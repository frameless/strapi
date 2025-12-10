import type { Context } from 'koa';
import { getService } from '../util';
import type { ContentBlock, Section } from '../types/strapi';

interface QueryParams {
  uid?: string;
}

interface RouteParams {
  id?: string;
}

export default {
  async config(ctx: Context) {
    try {
      const config = await getService('plugin').getConfig();
      ctx.body = config;
    } catch (error) {
      ctx.badRequest('Something went wrong with the Preview button config');
    }
  },

  async getAdditionalInformationData(ctx: Context) {
    try {
      const { id } = ctx.params as RouteParams;
      const { uid } = ctx.query as QueryParams;

      if (!id || !uid) {
        return ctx.badRequest('Missing id or uid parameter');
      }

      const entry = await strapi.entityService.findOne(uid as any, id, {
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

      if (!entry) {
        return ctx.notFound('Entry not found');
      }

      ctx.body = {
        data: {
          ...entry,
          contentBlock: entry.content?.contentBlock || [],
        },
      };
    } catch (error) {
      const err = error as Error;
      ctx.badRequest('Failed to fetch additional information data');
    }
  },

  async getInternalFieldData(ctx: Context) {
    try {
      const { id } = ctx.params as RouteParams;
      const { uid } = ctx.query as QueryParams;

      if (!id || !uid) {
        return ctx.badRequest('Missing id or uid parameter');
      }

      const entry = await strapi.entityService.findOne(uid as any, id, {
        populate: {
          product: { populate: { price: { populate: '*' } } },
          content: { populate: { contentBlock: { populate: '*' } } },
          contact_information_internal: { populate: { contentBlock: { populate: '*' } } },
          contact_information_public: { populate: { contentBlock: { populate: '*' } } },
        },
      });

      if (!entry) {
        return ctx.notFound('Entry not found');
      }

      const mergedData = [
        ...(entry.content?.contentBlock || []),
        ...(entry.contact_information_public?.contentBlock || []),
        ...(entry.contact_information_internal?.contentBlock || []),
      ];

      ctx.body = {
        data: {
          ...entry,
          mergedContent: mergedData,
        },
      };
    } catch (error) {
      const err = error as Error;
      console.error(err);
      ctx.badRequest('Failed to fetch internal-field data');
    }
  },

  async getVacData(ctx: Context) {
    try {
      const { id } = ctx.params as RouteParams;
      const { uid } = ctx.query as QueryParams;

      if (!id || !uid) {
        return ctx.badRequest('Missing id or uid parameter');
      }

      const entry = await strapi.entityService.findOne(uid as any, id, {
        populate: {
          vac: { populate: '*' },
          contact_information_internal: { populate: { contentBlock: { populate: '*' } } },
          contact_information_public: { populate: { contentBlock: { populate: '*' } } },
        },
      });

      if (!entry) {
        return ctx.notFound('Entry not found');
      }

      const mergedData = [
        ...(entry.vac?.antwoord || []),
        ...(entry.contact_information_public?.contentBlock || []),
        ...(entry.contact_information_internal?.contentBlock || []),
      ];

      ctx.body = {
        data: {
          ...entry,
          mergedContent: mergedData,
        },
      };
      return;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      ctx.badRequest('Failed to fetch VAC data');
    }
  },

  async getProductData(ctx: Context) {
    try {
      const { id } = ctx.params as RouteParams;
      const { uid } = ctx.query as QueryParams;

      if (!id || !uid) {
        return ctx.badRequest('Missing id or uid parameter');
      }

      const entry = await strapi.entityService.findOne(uid as any, id, {
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

      if (!entry) {
        return ctx.notFound('Entry not found');
      }

      let processedSections = entry.sections || [];
      let internalFieldData: { content: ContentBlock[] } | null = null;

      processedSections = processedSections.flatMap((section: any) => {
        if (section.__component === 'components.internal-block-content' && section.internal_field) {
          const internalField = section.internal_field;
          const mergedContentBlock = [
            ...(internalField.content?.contentBlock || []),
            ...(internalField.contact_information_public?.contentBlock || []),
            ...(internalField.contact_information_internal?.contentBlock || []),
          ];

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

        if (section.__component === 'components.contact-information-public' && section.contact_information_public) {
          const contentBlocks = section.contact_information_public.contentBlock || [];
          return contentBlocks.map((block: ContentBlock) => ({
            __component: 'components.utrecht-rich-text',
            id: block.id,
            content: block.content,
            kennisartikelCategorie: 'contact',
            label: block.label,
          }));
        }

        return section;
      });

      processedSections = processedSections.flat();

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
      const err = error as Error;
      console.error(err);
      ctx.badRequest('Failed to fetch product data');
    }
  },
};
