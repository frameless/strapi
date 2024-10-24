import type { Request } from 'express';
import type { Products } from '../strapi-product-type';

export const getPaginatedResponse = async (req: Request, strapiResponse: Products) => {
  if (!strapiResponse?.meta?.pagination) return {};
  // Get pagination info from Strapi response
  const { page, pageSize, pageCount, total } = strapiResponse.meta.pagination;

  // Get current URL and base path
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;

  // Get existing query parameters
  const queryParams = new URLSearchParams(req.query as any);

  // Generate URL with updated page
  const generatePageUrl = (pageNum: number) => {
    queryParams.set('page', pageNum.toString());
    queryParams.set('pageSize', pageSize.toString());
    return `${baseUrl}?${queryParams.toString()}`;
  };

  // Build pagination object
  const pagination = {
    page,
    pageSize,
    count: pageCount,
    total,
    next: page < pageCount ? generatePageUrl(page + 1) : null,
    previous: page > 1 ? generatePageUrl(page - 1) : null,
  };

  return {
    ...pagination,
  };
};
