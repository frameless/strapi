import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../client';
import { GET_PRODUCT_BY_SLUG_AND_LOCALE } from '../../query';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.query.secret !== process.env.PREVIEW_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const cmsRes = await client.query({
      query: GET_PRODUCT_BY_SLUG_AND_LOCALE,
      variables: {
        slug: req.query.slug,
        locale: req.query.locale,
        pageMode: 'PREVIEW',
      },
    });

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!cmsRes.data || cmsRes.data.products.data.length === 0) {
      return res?.status(404).redirect('/404');
    }
    const path = `/${req.query.locale}/${req.query.type}/${cmsRes.data.products.data[0].attributes.slug}`;
    // Enable Preview Mode by setting the cookies
    // Set the duration of the preview to 1 hour
    res.setPreviewData(
      {},
      {
        maxAge: 60 * 30,
        path,
      },
    );

    res.redirect(path);
  } catch (error) {
    // Todo build dynamic error page to handle server err
    res.status(500).redirect('/404');
  }
}
