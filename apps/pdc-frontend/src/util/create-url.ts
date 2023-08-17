import { format, parse } from 'url';

export const createURL = (baseUrl: string, params: any) => {
  const parsedUrl = parse(baseUrl, true);
  parsedUrl.query = params;
  const finalUrl = format(parsedUrl);
  return finalUrl;
};
