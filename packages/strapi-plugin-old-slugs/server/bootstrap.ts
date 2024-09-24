import type { Strapi } from '@strapi/strapi';
export type ContentTypes = {
  uid: string;
};
export interface Config {
  contentTypes?: ContentTypes[];
}

export default async ({ strapi }: { strapi: Strapi }) => {
  if (!strapi?.db) {
    return;
  }
  strapi.db.lifecycles.subscribe(async (event) => {
    if (!strapi?.db) return;
    const config = strapi.config.get('plugin.old-slugs', []) as Config;
    const isProvidedUID = config?.contentTypes?.some((ct) => ct?.uid === event.model.uid);

    if (!isProvidedUID) return;

    if (event.action === 'beforeUpdate' && isProvidedUID) {
      const existingEntry = await strapi.db
        .query(event.model.uid)
        .findOne({ where: { uuid: event.params.data?.uuid } });

      if (existingEntry && existingEntry.slug !== event.params.data.slug) {
        const previousSlugs: any = existingEntry.oldSlugs || [];
        // prevent duplication
        if (!previousSlugs.includes(existingEntry.slug)) {
          previousSlugs.push(existingEntry.slug);
          event.params.data.oldSlugs = previousSlugs;
        }
      }
    }
  });
};
