import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import { LinkButton } from '@strapi/design-system/LinkButton';
import usePluginConfig from '../../hooks/use-plugin-config';

const PreviewLink = () => {
  const { initialData } = useCMEditViewDataManager();
  if (!initialData.slug) {
    return null;
  }
  const { config } = usePluginConfig();

  return (
    <LinkButton
      size="S"
      startIcon={<Eye />}
      style={{ width: '100%' }}
      href={`${config?.domain}/api/preview?secret=${config?.token}&type=${config?.slug}&slug=${initialData.slug}&locale=${initialData.locale}`}
      variant="secondary"
      target="_blank"
      rel="noopener noreferrer"
      title="page preview"
    >
      Preview
    </LinkButton>
  );
};

export default PreviewLink;
