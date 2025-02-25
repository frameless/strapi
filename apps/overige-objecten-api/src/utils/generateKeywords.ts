import { Trefwoorden } from '../strapi-product-type';

export const generateKeywords = (keywords: string): Trefwoorden[] | [] =>
  keywords ? keywords.split(', ').map((keyword: string) => ({ trefwoord: keyword })) : [];
