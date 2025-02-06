import React from 'react';
import { renderToString } from 'react-dom/server';
import { buildImageURL } from './buildImageURL';

export type Attributes = {
  name: string;
  alternativeText?: string;
  caption?: string | null;
  width: number;
  height: number;
  url: string;
};

export type ImageDataType = {
  attributes: Attributes;
};

export interface ConvertImageToHTMLProps {
  data: ImageDataType;
  url: string;
}

export const convertImageToHTML = (imageData: ConvertImageToHTMLProps, url: string) => {
  const src = buildImageURL(url, imageData?.data?.attributes?.url);
  const alt = imageData?.data?.attributes?.alternativeText;
  if (!src) return null;
  return renderToString(<img src={src} alt={alt} />);
};
