export const getPreviewUrl = ({ url, token, type, slug, locale }) => {
  if (url) {
    url.pathname = '/api/preview';
    url.searchParams.set('secret', token);
    url.searchParams.set('type', type);
    url.searchParams.set('slug', slug);
    url.searchParams.set('locale', locale);
  }
  return url;
};
