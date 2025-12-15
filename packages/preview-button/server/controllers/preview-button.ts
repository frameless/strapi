/* eslint-disable no-console */
import type { Common } from '@strapi/strapi';
import type { Context } from 'koa';
import type { ContentBlock } from '../../src/types/strapi';
import { AdditionalInformation, InternalFieldData, ProductData, VacData } from '../types';
import { getService } from '../util';
interface QueryParams {
  uid?: Common.UID.ContentType;
}

interface RouteParams {
  id?: string;
}

// eslint-disable-next-line no-undef
type FindOneParams = Parameters<typeof strapi.entityService.findOne>[2];

export default {
  async config(ctx: Context): Promise<void> {
    try {
      const config = await getService('plugin').getConfig();
      ctx.body = config;
    } catch (error) {
      ctx.badRequest('Something went wrong with the Preview button config');
    }
  },

  async getAdditionalInformationData(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params as RouteParams;
      const { uid } = ctx.query as QueryParams;

      if (!id || !uid) {
        ctx.badRequest('Missing id or uid parameter');
        return;
      }

      // eslint-disable-next-line no-undef
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
      } as FindOneParams);

      if (!entry) {
        ctx.notFound('Entry not found');
        return;
      }

      const entryData = entry as AdditionalInformation | null;

      ctx.body = {
        data: {
          ...entry,
          contentBlock: entryData?.content?.contentBlock || [],
        },
      };
    } catch (error) {
      const err = error as Error;
      console.error(err);
      ctx.badRequest('Failed to fetch additional information data');
    }
  },

  async getInternalFieldData(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params as RouteParams;
      const { uid } = ctx.query as QueryParams;

      if (!id || !uid) {
        ctx.badRequest('Missing id or uid parameter');
        return;
      }

      // eslint-disable-next-line no-undef
      const entry = await strapi.entityService.findOne(uid, id, {
        populate: {
          product: { populate: { price: { populate: '*' } } },
          content: { populate: { contentBlock: { populate: '*' } } },
          contact_information_internal: { populate: { contentBlock: { populate: '*' } } },
          contact_information_public: { populate: { contentBlock: { populate: '*' } } },
        },
      } as FindOneParams);

      if (!entry) {
        ctx.notFound('Entry not found');
        return;
      }

      const entryData = entry as InternalFieldData;
      const mergedData = [
        ...(entryData.content?.contentBlock || []),
        ...(entryData.contact_information_public?.contentBlock || []),
        ...(entryData.contact_information_internal?.contentBlock || []),
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

  async getVacData(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params as RouteParams;
      const { uid } = ctx.query as QueryParams;

      if (!id || !uid) {
        ctx.badRequest('Missing id or uid parameter');
        return;
      }

      // eslint-disable-next-line no-undef
      const entry = await strapi.entityService.findOne(uid, id, {
        populate: {
          vac: { populate: '*' },
          contact_information_internal: { populate: { contentBlock: { populate: '*' } } },
          contact_information_public: { populate: { contentBlock: { populate: '*' } } },
        },
      } as FindOneParams);

      if (!entry) {
        ctx.notFound('Entry not found');
        return;
      }
      const entryData = entry as VacData;
      const mergedData = [
        ...(entryData.vac?.antwoord || []),
        ...(entryData.contact_information_public?.contentBlock || []),
        ...(entryData.contact_information_internal?.contentBlock || []),
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

  async getProductData(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params as RouteParams;
      const { uid } = ctx.query as QueryParams;

      if (!id || !uid) {
        ctx.badRequest('Missing id or uid parameter');
        return;
      }

      // eslint-disable-next-line no-undef
      const entry = await strapi.entityService.findOne(uid as Common.UID.ContentType, id, {
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
      } as FindOneParams);

      if (!entry) {
        ctx.notFound('Entry not found');
        return;
      }
      const entryData = entry as ProductData;
      let processedSections = entryData.sections || [];
      let internalFieldData: { content: ContentBlock[] } | null = null;

      processedSections = processedSections.flatMap((section) => {
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

      if (entryData.content) {
        processedSections = [
          {
            id: processedSections.length + 1,
            content: entryData.content,
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
