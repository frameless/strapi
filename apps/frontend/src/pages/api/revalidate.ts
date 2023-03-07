import type { NextApiRequest, NextApiResponse } from 'next';

// TODO
// Currently we use revalidate in the individually it trigger ones when the user visit the page or when there will be a new
// update the revalidate triggered each 1 second so just refresh you will get the new update
// However there is a different approach https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation the code snippet below that also can make the job
// done but we need to trigger this endpoint from Strapi for example the we can use the publish button, so we need to figure it out!
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate(`/${req.query.locale}/${req.query.slug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue

    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
