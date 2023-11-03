import { LinkButton } from '@strapi/design-system/LinkButton';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import React from 'react';
import usePluginConfig from '../../hooks/use-plugin-config';

function PreviewLink() {
  const data = useCMEditViewDataManager();
  const { config } = usePluginConfig();
  const isSupportPreview = config.data?.contentTypes?.find((type) => type.uid === data.layout.uid);

  if (!isSupportPreview) return null;

  const url = new URL(config?.data?.domain);
  url.pathname = '/api/preview';
  url.searchParams.set('secret', config.data.token);
  url.searchParams.set('type', isSupportPreview.query.type);
  url.searchParams.set('slug', data.initialData.slug);
  url.searchParams.set('locale', data.initialData.locale);

  return (
    <LinkButton
      size="S"
      startIcon={<Eye />}
      style={{ width: '100%' }}
      href={url.href}
      variant="secondary"
      target="_blank"
      rel="noopener noreferrer"
      title="page preview"
    >
      Preview
    </LinkButton>
  );
}

export default PreviewLink;
