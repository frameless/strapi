import { prefixFileUrlWithBackendUrl, useLibrary } from '@strapi/helper-plugin';
import React from 'react';

interface Image {
  createdAt: string;
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    [key: string]: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  folderPath: string;
  updatedAt: string;
  folder: any | null;
  isSelectable: boolean;
  type: string;
}

interface MediaLibProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (formattedImages: Image[]) => void;
  onToggle: () => void;
}

const MediaLib: React.FC<MediaLibProps> = ({ isOpen, onChange, onToggle }) => {
  const { components } = useLibrary();
  const MediaLibraryDialog = components['media-library'];

  const handleSelectAssets = (images: Image[]) => {
    const formattedImages = images.map((image) => ({
      ...image,
      alt: image.alternativeText || image.name,
      url: prefixFileUrlWithBackendUrl(image.url),
      mime: image.mime,
    }));

    onChange(formattedImages);
  };

  if (!isOpen) {
    return null;
  }

  return <MediaLibraryDialog onClose={onToggle} onSelectAssets={handleSelectAssets} />;
};

export default MediaLib;
