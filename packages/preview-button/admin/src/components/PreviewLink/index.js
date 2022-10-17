import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import { LinkButton } from '@strapi/design-system/LinkButton';

const PreviewLink = () => {
    const { initialData } = useCMEditViewDataManager();
    if (!initialData.slug) {
        return null;
    }

    return (
        <LinkButton
            size="S"
            startIcon={<Eye />}
            style={{ width: '100%' }}
            href={`${STRAPI_FRONTEND_URL}?secret=${STRAPI_FRONTEND_PREVIEW_SECRET}&type=${STRAPI_FRONTEND_TYPE}&slug=${initialData.slug}&locale=${initialData.locale}`}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            title="page preview"
        >Preview
        </LinkButton>
    );
};

export default PreviewLink;