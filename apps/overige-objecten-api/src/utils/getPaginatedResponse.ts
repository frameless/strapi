import type { Request } from 'express';

export type PaginationType = {
  page?: number;
  pageSize?: number;
  count?: number;
  total?: number;
  next?: string | null;
  previous?: string | null;
};

type ConnectionResponse = { page: number; pageSize: number; pageCount: number; total: number };

export const getPaginatedResponse = async (
  req: Request,
  strapiResponse: ConnectionResponse | null | undefined,
): Promise<PaginationType> => {
  const pageInfo = (strapiResponse as ConnectionResponse) ?? {};
  if (!pageInfo) return {};

  const { page, pageSize, pageCount, total } = pageInfo;

  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  const queryParams = new URLSearchParams(req.query as Record<string, string>);

  const generatePageUrl = (pageNum: number) => {
    queryParams.set('page', pageNum.toString());
    queryParams.set('pageSize', pageSize.toString());
    return `${baseUrl}?${queryParams.toString()}`;
  };

  return {
    page,
    pageSize,
    count: pageCount,
    total,
    next: page < pageCount ? generatePageUrl(page + 1) : null,
    previous: page > 1 ? generatePageUrl(page - 1) : null,
  };
};
