import { renderToString } from 'react-dom/server';

import { ImageData } from '../shared-types';

import { buildImageURL } from './buildImageURL';

export const convertImageToHTML = (imageData: ImageData, url: string) => {
  const src = buildImageURL(url, imageData.url);
  const alt = imageData?.alternativeText;
  if (!src) return null;
  return renderToString(<img src={src} alt={alt ?? ''} />);
};
