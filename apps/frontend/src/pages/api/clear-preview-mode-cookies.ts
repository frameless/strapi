import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    res.clearPreviewData({ path: `/${req.query.slug}` });
    return res.status(200).redirect(`/${req.query.default_locale}`);
  } catch (error) {
    return res.status(500).redirect('/404');
  }
}
