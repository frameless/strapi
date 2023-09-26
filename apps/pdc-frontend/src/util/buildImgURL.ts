export const buildImgURL = (src: string) => {
  if (!process.env.STRAPI_PUBLIC_URL) {
    throw new Error('`STRAPI_PUBLIC_URL` is required to construct the image URL in the Markdown component.');
  }
  const url = new URL(process.env.STRAPI_PUBLIC_URL);
  // if we need to support a different image-provider-upload, we can use the following approach
  // just rename env variable
  // if (process.env.DEPLOY_TO_VERCEL && Boolean(process.env.DEPLOY_TO_VERCEL)) {
  //   return src;
  // }
  return `${url?.origin}${src}`;
};
